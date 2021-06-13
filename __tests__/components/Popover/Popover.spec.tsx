import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import { Button, Text } from '../../../src';
import { Popover, PopoverProps } from '../../../src/components/Popover/Popover';

function popover(args: Partial<PopoverProps>) {
  return (
    <Popover overlay={<Text id="text">Hello World</Text>} {...args}>
      {args.children || <Button id="button">Hello</Button>}
    </Popover>
  );
}

describe('Popover', () => {
  it('Should take width of child if expand = true', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(popover({ expand: true }));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    await act(async () => {
      fireEvent.mouseOver(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 1;
    `);

    // Jest doesn't render elements so boundingClientRect will have all values = 0
    expect(document.querySelector('.sha-el-tooltip-inner')).toHaveStyle(`width: 0px`);
  });
});

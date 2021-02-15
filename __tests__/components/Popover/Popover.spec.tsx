import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, Popover, Text } from '../../../src';
import { initialize } from '../../../src/helpers';

const renderPopover = (props: Props) => {
  initialize();
  render(
    <Popover
      position={props.position}
      content={
        <Text margin="15px" variant="h4">
          Content
        </Text>
      }
    >
      <Button>Hello</Button>
    </Popover>,
  );
};

describe('Popover', () => {
  it('should render a simple popover', () => {
    renderPopover({ position: 'bottom' });

    const button = document.querySelector('button');
    expect(button.innerHTML).toBe('<span>Hello</span>');
    button.click();

    const popover = document.querySelector('.rc-tooltip');
    expect(popover).toHaveStyle(`
      width: auto;
      padding: 0px;
      min-width: 100px;
      background: rgb(255, 255, 255);
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.87);
      position: absolute;
      z-index: 1070;
      display: block;
      visibility: visible;
      line-height: 1.5;
      font-size: 12px;
    `);
    console.log(popover.classList);

    const arrow = popover.querySelectorAll('.rc-tooltip-arrow');
    expect(arrow[1]).toHaveStyle(`
      display: block;
      left: 50%;
    `);

    const content = popover.querySelector('h4');
    expect(content).toHaveStyle(`
      margin: 15px;
      font-style: normal;
      font-weight: normal;
      font-size: 2.28rem;
      line-height: 110%;
    `);
    expect(content.innerHTML).toBe('Content');
  });
});

interface Props {
  position?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

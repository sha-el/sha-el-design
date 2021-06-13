import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import React, { useState } from 'react';
import { Button, Tooltip, Text } from '../../../src';
import { TooltipProps } from '../../../src/components/Tooltip/Tooltip';

function toolTip(args: Partial<TooltipProps>) {
  return (
    <Tooltip {...args} overlay={<Text id="text">Hello World</Text>}>
      {args.children || <Button id="button">Hello</Button>}
    </Tooltip>
  );
}

function ControlledToolTip(args: Partial<TooltipProps>) {
  const [state, updateState] = useState(args.visible);

  return (
    <>
      <Tooltip
        {...args}
        visible={state}
        onVisibleChange={(v) => {
          updateState(v);
          args.onVisibleChange(v);
        }}
        overlay={<Text id="text">Hello World</Text>}
      >
        <Button id="button">Hello</Button>
      </Tooltip>
      <Button id="button2" onClick={() => updateState(true)}>
        Open
      </Button>
    </>
  );
}

describe('Tooltip', () => {
  it('Should open tooltip on mouseover', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({}));
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

    await act(async () => {
      fireEvent.mouseOver(document.querySelector('body'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    expect(document.querySelector('.arrow')).not.toBeNull();
  });

  it('Wont show up for triggers other than mentioned', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ trigger: 'onMouseOver' }));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    await act(async () => {
      fireEvent.click(document.getElementById('button'));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);
  });

  it('Should open on click and close on click outside of reference element and tooltip', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ trigger: 'onClick' }));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    await act(async () => {
      fireEvent.click(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    await act(async () => {
      fireEvent.click(document.querySelector('body'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);
  });

  it('Should open on focus and close on blur', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ trigger: 'onFocus' }));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
    opacity: 0;
  `);

    await act(async () => {
      fireEvent.focus(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    await act(async () => {
      fireEvent.blur(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
    opacity: 0;
  `);
  });

  it('Should open on mouseover and close on click', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ trigger: 'onMouseOver', closeTrigger: 'onClick' }));
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

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    await act(async () => {
      fireEvent.click(document.querySelector('body'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
    opacity: 0;
  `);
  });

  it('Should open on click or mouseover and close on blur or click', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ trigger: ['onClick', 'onMouseOver'], closeTrigger: ['onBlur', 'onClick'] }));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    await act(async () => {
      fireEvent.click(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    await act(async () => {
      fireEvent.blur(document.querySelector('#button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    /**
     * Mouse over trigger
     */

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    await act(async () => {
      fireEvent.mouseOver(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    await act(async () => {
      fireEvent.click(document.querySelector('body'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);
  });

  it('should hide arrow', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ hideArrow: true }));
    });

    await act(async () => {
      fireEvent.mouseOver(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.arrow')).toBeNull();
  });

  it('should close on click on achor', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(toolTip({ trigger: 'onClick' }));
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    await act(async () => {
      fireEvent.click(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 1;
    `);

    await act(async () => {
      fireEvent.click(document.getElementById('button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`
      opacity: 0;
    `);

    expect(document.querySelector('.arrow')).not.toBeNull();
  });

  it('should expose reference element', async () => {
    jest.useFakeTimers();

    const ref = jest.fn();

    await act(async () => {
      render(toolTip({ trigger: 'onClick', referenceElement: ref }));
    });

    expect(ref).toBeCalledWith(document.querySelector('#button'));
  });

  it('should render a controlled component', async () => {
    jest.useFakeTimers();

    const updateState = jest.fn();

    await act(async () => {
      render(<ControlledToolTip visible onVisibleChange={updateState} />);
    });

    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    await act(async () => {
      fireEvent.mouseOver(document.querySelector('body'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(updateState).toBeCalled();
    expect(updateState).toBeCalledWith(false);

    await act(async () => {
      fireEvent.mouseOver(document.querySelector('#button'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(updateState).toBeCalledWith(true);
  });

  it("should execute children's onClick, onFocus and onBlur", async () => {
    jest.useFakeTimers();

    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onMouseEnter = jest.fn();
    const onBlur = jest.fn();

    await act(async () => {
      render(
        toolTip({
          children: <Button id="button" onClick={onClick} onFocus={onFocus} onBlur={onBlur} />,
        }),
      );
    });

    await act(async () => {
      fireEvent.click(document.querySelector('#button'));
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(onClick).toBeCalled();

    await act(async () => {
      fireEvent.focus(document.querySelector('#button'));
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(onFocus).toBeCalled();

    await act(async () => {
      fireEvent.blur(document.querySelector('#button'));
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(onBlur).toBeCalled();

    await act(async () => {
      render(
        toolTip({
          trigger: 'onClick',
          children: <Button id="button2" onMouseEnter={onMouseEnter} />,
        }),
      );
    });

    await act(async () => {
      fireEvent.mouseEnter(document.querySelector('#button2'));
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(onMouseEnter).toBeCalled();
  });
});

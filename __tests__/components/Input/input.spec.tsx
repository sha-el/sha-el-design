import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Input, Textarea } from '../../../src';

import '@testing-library/jest-dom';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('BaseInputComponent', () => {
  it('should render an input', () => {
    act(() => {
      ReactDOM.render(<Input placeholder="placeholder" />, container);
    });

    const inputDiv = document.querySelector('.sha-el-input');
    const input = inputDiv.querySelector('input');

    expect(inputDiv).toHaveStyle(`
      color: rgba(0, 0, 0, 0.54);
      cursor: text;
      position: relative;
      font-size: 14px;
      transition: background-color 0.2s ease-in-out 0s,border-color 0.2s ease-in-out 0s;
    `);

    expect(input).toHaveAttribute('placeholder', 'placeholder');
    expect(input).toHaveStyle(`
      color: rgb(85, 85, 85);
      height: 47px;
      display: inline-block;
      outline: none;
      padding: 16px;
      font-size: 14px;
      background: transparent;
      box-sizing: border-box;
      line-height: 12px;
      border: 2px inset;
    `);
  });

  it('should render a textarea', () => {
    act(() => {
      ReactDOM.render(<Textarea placeholder="placeholder" />, container);
    });

    const textareaDiv = document.querySelector('.sha-el-input');
    const textarea = textareaDiv.querySelector('textarea');

    expect(textarea).toHaveAttribute('placeholder', 'placeholder');
    expect(textarea).toHaveStyle(`
      color: rgb(85, 85, 85);
      height: 47px;
      display: inline-block;
      outline: none;
      padding: 16px;
      font-size: 14px;
      background: transparent;
      box-sizing: border-box;
      line-height: 12px;
      border: 1px solid;
    `);
  });

  it('should render a boderless input', () => {
    act(() => {
      ReactDOM.render(<Input borderless />, container);
    });

    const fieldset = document.querySelector('fieldset');

    expect(fieldset).toHaveStyle(`
      border-bottom: 1px solid hsla(0,0%,0%,.2);
      border-radius: 0;
    `);
  });

  it('should render a disabled boderless input', () => {
    act(() => {
      ReactDOM.render(<Input disabled borderless />, container);
    });

    const fieldset = document.querySelector('fieldset');

    expect(fieldset).toHaveStyle(`
      border-bottom: 1px dotted hsla(0,0%,0%,.2);
      border-radius: 0;
    `);
  });

  it('should render an input with label', () => {
    act(() => {
      ReactDOM.render(<Input label="label" />, container);
    });

    const input = document.querySelector('input');
    const label = document.querySelector('label');

    expect(label.innerHTML).toBe('label ');
    expect(label).toHaveStyle(`
      position: absolute;
      color: rgba(0, 0, 0, 0.54);
      left: 0;
      top: 0;
      z-index: 1;
      transform: translate(16px, 16px) scale(1);
      pointer-events: none;
      transition: all 0.2s;
      transform-origin: top left;
      display: block;
    `);

    input.focus();
    expect(label).toHaveStyle(`
      transform: translate(16px, -6px) scale(0.75);
    `);

    input.blur();
    expect(label).toHaveStyle(`
      transform: translate(16px, 16px) scale(1);
    `);
  });

  it('should render an input with ref, onFocus and onBlur props', () => {
    let focus, blur, inputEvent;
    act(() => {
      ReactDOM.render(
        <Input onFocus={(e) => (focus = e.type)} onBlur={(e) => (blur = e.type)} ref={(e) => (inputEvent = e)} />,
        container,
      );
    });

    const input = document.querySelector('input');

    input.focus();
    expect(focus).toBe('focus');
    input.blur();
    expect(blur).toBe('blur');

    expect(inputEvent.innerHTML).toBe(input.innerHTML);
  });

  it('should render an input with required label', () => {
    act(() => {
      ReactDOM.render(<Input label="label" required />, container);
    });

    const label = document.querySelector('label');
    const required = label.querySelector('span');

    expect(required.innerHTML).toBe('*');
    expect(required).toHaveStyle(`
      color: red;
    `);
  });

  it('should render an input with error', () => {
    act(() => {
      ReactDOM.render(<Input error="error" />, container);
    });

    const error = document.querySelector('label');

    expect(error.innerHTML).toBe('error');
    expect(error).toHaveStyle(`
      color: rgb(244, 67, 54);
    `);
  });

  it('should render an input with hint', () => {
    act(() => {
      ReactDOM.render(<Input hint="hint" />, container);
    });

    const hint = document.querySelector('label');

    expect(hint.innerHTML).toBe('hint');
    expect(hint).toHaveStyle(`
      color: rgb(170, 170, 170);
    `);
  });

  it('should render an input with error and hint', () => {
    act(() => {
      ReactDOM.render(<Input error="error" hint="hint" />, container);
    });

    const help = document.querySelector('.help');

    expect(help).toHaveStyle(`
      width: 100%;
      display: flex;
      font-size: .65rem;
    `);
  });

  it('should render an input with before prop', () => {
    act(() => {
      ReactDOM.render(<Input before="before" />, container);
    });

    const before = document.querySelector('.seudo');

    expect(before.innerHTML).toBe('before');
  });

  it('should render an input with after prop', () => {
    act(() => {
      ReactDOM.render(<Input after="after" />, container);
    });

    const after = document.querySelector('.seudo');

    expect(after.innerHTML).toBe('after');
    expect(after).toHaveStyle(`padding-right: 12px`);
  });

  it('should render a boderless input with after and before prop', () => {
    act(() => {
      ReactDOM.render(<Input borderless after="after" before="before" />, container);
    });

    const after = document.querySelectorAll('.seudo')[0];
    const before = document.querySelectorAll('.seudo')[1];

    expect(after).toHaveStyle(`
      display: flex;
      align-items: center;
    `);
    expect(before).toHaveStyle(`
      display: flex;
      align-items: center;
    `);
  });

  it('should render an input with custom style', () => {
    act(() => {
      ReactDOM.render(<Input containerStyle={{ padding: '25px' }} />, container);
    });

    const inputDiv = document.querySelector('.sha-el-input');

    expect(inputDiv).toHaveStyle(`
      padding: 25px;
    `);
  });

  it('should render a disabled input', () => {
    act(() => {
      ReactDOM.render(<Input disabled />, container);
    });

    const input = document.querySelector('input');

    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveStyle(`
      cursor: not-allowed;
    `);
  });
});

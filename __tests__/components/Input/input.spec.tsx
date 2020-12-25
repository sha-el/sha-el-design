import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Input } from '../../../src';

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

describe('input', () => {
  it('should render an input', () => {
    act(() => {
      ReactDOM.render(<Input placeholder="placeholder" />, container);
    });

    const inputDiv = document.querySelector('.sha-el-input');
    const input = inputDiv.querySelector('input');

    expect(inputDiv).toHaveStyle(`
      color: rgba(0, 0, 0, 0.54);
      border: 1px solid hsla(0,0%,0%,.2);
      cursor: text;
      position: relative;
      font-size: 14px;
      transition: background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s;
      line-height: 1.12857;
      border-radius: 4px;
    `);

    expect(input).toHaveAttribute('placeholder', 'placeholder');
    expect(input).toHaveStyle(`
      color: rgb(85, 85, 85);
      height: 36px;
      display: inline;
      outline: none;
      padding: 9px 10px;
      font-size: 14px;
      max-width: 100%;
      min-width: 100%;
      background: transparent;
      box-sizing: border-box;
      font-family: "Roboto", sans-serif;
      line-height: 12px;
      border: 2px inset;
    `);
  });

  it('should render a boderless input', () => {
    act(() => {
      ReactDOM.render(<Input borderLess />, container);
    });

    const inputDiv = document.querySelector('.sha-el-input');

    expect(inputDiv).toHaveStyle(`
      border-bottom: 1px solid hsla(0,0%,0%,.2);
      border-radius: 0;
    `);
  });

  it('should render an input with label', () => {
    act(() => {
      ReactDOM.render(<Input label="label" />, container);
    });

    const input = document.querySelector('input');
    const label = document.querySelector('span');

    expect(label.innerHTML).toBe('label ');
    expect(label).toHaveStyle(`
      top: -7px;
      left: 0px;
      color: rgba(0, 0, 0, 0.54);
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      font-size: 13px;
      align-self: center;
      box-sizing: border-box;
      transition: line-height 0.2s;
      font-weight: 300;
      line-height: 51px;
      pointer-events: none;
    `);

    input.focus();

    expect(label).toHaveStyle(`
      font-size: 10px;
      line-height: 13px;
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
      padding: 0px 5px;
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
      padding: 0px 5px;
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
      font-size: 12px;
      margin-bottom: 20px;
      place-content: space-between;
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

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { CheckBox } from '../../../src';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md';

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

describe('CheckBox', () => {
  it('should render a checkbox', () => {
    act(() => {
      ReactDOM.render(
        <div>
          <CheckBox />
          <MdCheckBoxOutlineBlank size="22px" id="icon" />
        </div>,
        container,
      );
    });

    const checkbox = document.querySelector('svg');
    const icon = document.querySelector('#icon');
    const input = document.querySelector('input');
    const div: HTMLDivElement = document.querySelector('.sha-el-row');

    expect(checkbox.innerHTML).toBe(icon.innerHTML);
    expect(checkbox).toHaveStyle(`
      fill: rgba(0, 0, 0, 0.54);
      display: flex;
    `);

    expect(input).not.toBeChecked();
    input.click();
    expect(input).toBeChecked();
    expect(input).toHaveStyle(`
      display: none;
    `);

    expect(div).toHaveStyle(`
      cursor: pointer;
    `);
  });

  it('should render a checked checkbox', () => {
    act(() => {
      ReactDOM.render(
        <div>
          <CheckBox checked />
          <MdCheckBox size="22px" id="icon" />
        </div>,
        container,
      );
    });

    const checkbox = document.querySelector('svg');
    const icon = document.querySelector('#icon');
    const input = document.querySelector('input');

    expect(checkbox.innerHTML).toBe(icon.innerHTML);
    expect(input).toBeChecked();
  });

  it('should render a checkbox with label', () => {
    act(() => {
      ReactDOM.render(<CheckBox label="Hello, World!" />, container);
    });

    const label = document.querySelector('span');

    expect(label.innerHTML).toBe('Hello, World!');
  });

  it('should render an intermediate checkbox', () => {
    act(() => {
      ReactDOM.render(
        <div>
          <CheckBox intermediate />
          <MdIndeterminateCheckBox size="22px" id="icon" />
        </div>,
        container,
      );
    });

    const checkbox = document.querySelector('svg');
    const icon = document.querySelector('#icon');
    const input = document.querySelector('input');

    expect(checkbox.innerHTML).toBe(icon.innerHTML);
    expect(input).toBeChecked();
  });

  it('should render a checkbox of custom color', () => {
    act(() => {
      ReactDOM.render(<CheckBox color="red" checked />, container);
    });

    const checkbox = document.querySelector('svg');

    expect(checkbox).toHaveStyle(`
      fill: red;
    `);
  });

  it('should render a disabled checkbox', () => {
    act(() => {
      ReactDOM.render(<CheckBox disabled />, container);
    });

    const checkbox = document.querySelector('svg');
    const div: HTMLDivElement = document.querySelector('.sha-el-row');
    const input = document.querySelector('input');

    expect(checkbox).toHaveStyle(`
      fill: rgba(0, 0, 0, 0.20);
    `);
    expect(div).toHaveStyle(`
      cursor: not-allowed;
    `);

    div.click();
    input.click();
    expect(input).not.toBeChecked();
  });
});

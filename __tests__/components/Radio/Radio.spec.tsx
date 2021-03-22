import React from 'react';
import { Radio } from '../../../src';

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

describe('Radio', () => {
  it('should render a basic radio', () => {
    render(<Radio />);

    const container = document.querySelector('.sha-el-row');

    expect(container).toHaveStyle(`
      cursor: pointer;
      margin: 0 5px;
    `);
    const radio = document.querySelector('.radio-circle');

    expect(radio).toHaveStyle(`
      height: 18px;
      width: 18px;
      border: 1px solid rgba(0, 0, 0, 0.54);
      borderRadius: 100%;
      transition: background .2s;
    `);
  });

  it('should render a radio with label', () => {
    render(<Radio label="Label" />);

    const label = document.querySelector('label');
    expect(label.innerHTML).toBe('Label');
    expect(label).toHaveStyle(`
      font-weight: normal;
      font-style: normal;
      color: rgba(0, 0, 0, 0.54);
      margin: 0 0 0 9px;
    `);
  });

  it('should render a checked radio', () => {
    render(<Radio checked readOnly label="Label" />);

    const radio = document.querySelector('.radio-circle');
    expect(radio).toHaveStyle(`
      borderColor: #536DFE;
      background: #536DFE;
      box-shadow: 0px 3px 11px 0px #E8EAFC,0 3px 3px -2px #B2B2B21A,0 1px 8px 0 #9A9A9A1A;
    `);

    const label = document.querySelector('label');
    expect(label).toHaveStyle(`
      color: rgba(0, 0, 0, 0.54);
    `);
  });

  it('should render a radio with onChange and onClick', () => {
    let checked = null;
    let el = null;
    const onChange = (e) => {
      checked = e.target.checked;
      el = e.target;
    };

    const fn = jest.fn();

    render(<Radio onClick={fn} onChange={onChange} />);

    const input = document.querySelector('input');

    expect(input).toHaveStyle(`
    display: none;
  `);

    expect(input).not.toBeChecked();

    input.click();
    expect(input).toBeChecked();
    expect(fn).toBeCalledTimes(1);

    expect(checked).toBeTruthy();
    expect(el).toEqual(input);
  });

  it('should not allow click if disabled', () => {
    const fn = jest.fn();

    render(<Radio disabled onClick={fn} />);

    const input = document.querySelector('input');

    input.click();
    expect(fn).toBeCalledTimes(0);

    expect(input.disabled).toBeTruthy();
  });

  it('should render a radio and check click on container', () => {
    render(<Radio label="Label" />);

    const container = document.querySelector('.sha-el-row');
    fireEvent.click(container);

    const radio = document.querySelector('.radio-circle');
    expect(radio).toHaveStyle(`
      borderColor: #536DFE;
      background: #536DFE;
      box-shadow: 0px 3px 11px 0px #E8EAFC,0 3px 3px -2px #B2B2B21A,0 1px 8px 0 #9A9A9A1A;
    `);
  });
});

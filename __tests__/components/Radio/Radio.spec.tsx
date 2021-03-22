import React from 'react';
import { Radio, RadioButton, RadioGroup } from '../../../src';

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

const CreateRadioGroup = () => {
  const [best, updatebest] = React.useState('Bruce');

  return (
    <RadioGroup value={best} name="rich" onChange={(e) => updatebest(e.target.value)}>
      <Radio value="Bruce" label="Bruce" />
      <Radio value="Stark" label="Stark" />
    </RadioGroup>
  );
};

const CreateRadioButtonGroup = () => {
  const [best, updatebest] = React.useState('Bruce');

  return (
    <RadioGroup value={best} name="rich" onChange={(e) => updatebest(e.target.value)}>
      <RadioButton value="Bruce" label="Bruce" />
      <RadioButton value="Stark" label="Stark" />
    </RadioGroup>
  );
};

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

describe('RadioButton', () => {
  it('should render a radio button and check click', () => {
    const fn = jest.fn();

    render(<RadioButton label="Label" onClick={fn} />);

    const radioButton = document.querySelector('button');
    const input = document.querySelector('input');

    expect(radioButton.innerHTML).toBe('<span>Label</span>');
    expect(radioButton).toHaveStyle(`
      color: #555555;
    `);
    // expect(radioButton).toHaveStyle(`
    //   background: #536DFE;
    // `);

    input.click();
    expect(fn).toBeCalledTimes(1);
  });
});

describe('RadioGroup', () => {
  it('should render a Radio group', () => {
    render(<CreateRadioGroup />);

    const labels = document.querySelectorAll('label');
    expect(labels[0].innerHTML).toBe('Bruce');
    expect(labels[1].innerHTML).toBe('Stark');

    const radios = document.querySelectorAll('.radio-circle');
    const inputs = document.querySelectorAll('input');

    // Check normal state
    expect(radios[0]).toHaveStyle(`
      borderColor: #536DFE;
      background: #536DFE;
      box-shadow: 0px 3px 11px 0px #E8EAFC,0 3px 3px -2px #B2B2B21A,0 1px 8px 0 #9A9A9A1A;
    `);
    expect(inputs[0]).toBeChecked();
    expect(inputs[1]).not.toBeChecked();

    inputs[1].click();

    // Check updated state
    expect(radios[1]).toHaveStyle(`
      borderColor: #536DFE;
      background: #536DFE;
      box-shadow: 0px 3px 11px 0px #E8EAFC,0 3px 3px -2px #B2B2B21A,0 1px 8px 0 #9A9A9A1A;
    `);
    expect(inputs[1]).toBeChecked();
    expect(inputs[0]).not.toBeChecked();

    labels[0].click();
    expect(inputs[0]).toBeChecked();
    expect(inputs[1]).not.toBeChecked();
  });

  it('should render a RadioButton group', () => {
    render(<CreateRadioButtonGroup />);

    const radioButtons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input');

    expect(radioButtons[0].innerHTML).toBe('<span>Bruce</span>');
    expect(radioButtons[1].innerHTML).toBe('<span>Stark</span>');

    // Check normal state
    expect(radioButtons[0]).toHaveStyle(`
      background: #536DFE;
    `);
    expect(inputs[0]).toBeChecked();
    expect(inputs[1]).not.toBeChecked();

    radioButtons[1].click();

    // Check updated state
    expect(inputs[1]).toBeChecked();
    expect(inputs[0]).not.toBeChecked();
    // expect(radioButtons[0]).toHaveStyle(`
    //   background: #536DFE;
    // `);
    // expect(radioButtons[1]).toHaveStyle(`
    //   background: #536DFE;
    // `);
  });
});

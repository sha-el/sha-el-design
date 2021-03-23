import React from 'react';
import { Radio, RadioButton, RadioGroup } from '../../../src';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

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
      box-shadow: 0 2px 4px 0 #E8EAFC;
    `);
    expect(inputs[0]).toBeChecked();
    expect(inputs[1]).not.toBeChecked();

    inputs[1].click();

    // Check updated state
    expect(radios[1]).toHaveStyle(`
      borderColor: #536DFE;
      background: #536DFE;
      box-shadow: 0 2px 4px 0 #E8EAFC;
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

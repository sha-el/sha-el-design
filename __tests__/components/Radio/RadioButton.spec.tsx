import React from 'react';
import { RadioButton } from '../../../src';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

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

    input.click();
    expect(fn).toBeCalledTimes(1);
  });
});

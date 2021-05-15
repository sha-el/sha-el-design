import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Divider } from '../../../src';

describe('Divider', () => {
  it('should render a divider', () => {
    render(<Divider className="divider" />);

    const divider = document.querySelector('.divider');

    expect(divider).toHaveStyle(`
      width: 100%;
      margin: 5px 0px;
      display: inline-block;
      position: relative;
      background: rgb(255, 255, 255);
      text-align: center;
    `);
  });

  it('should render a divider with children', () => {
    render(<Divider className="divider">Hello</Divider>);

    const divider = document.querySelector('.divider');

    expect(divider.innerHTML).toBe('Hello');
  });
});

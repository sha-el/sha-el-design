import React from 'react';
import { Badge, Button } from '../../../src';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Badge', () => {
  it('should render a default badge', () => {
    render(
      <Badge>
        <Button>Submit</Button>
      </Badge>,
    );

    const badge = document.querySelector('sup');

    expect(badge.innerHTML).toBe('');
    expect(badge).toHaveStyle(`
      top: 0;
      color: #ffffff;
      right: 0;
      height: 20px;
      display: flex;
      padding: 0 0px;
      z-index: 1;
      position: absolute;
      font-size: 12px;
      min-width: 20px;
      transform: translate(50%, -50%);
      background: red;
      align-items: center;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      border-radius: 10px;
      justify-content: center;
    `);
  });

  it('should render a count badge', () => {
    render(<Badge count={7} />);

    const badge = document.querySelector('sup');

    expect(badge.innerHTML).toBe('7');
    expect(badge).toHaveStyle(`
      padding: 0 2px;
    `);
  });

  it('should render a color badge', () => {
    render(<Badge count={7} color="black" />);

    const badge = document.querySelector('sup');

    expect(badge).toHaveStyle(`
      background: black;
    `);
  });

  it('should render a maxCount badge', () => {
    render(<Badge count={7} maxCount={5} />);

    const badge = document.querySelector('sup');

    expect(badge.innerHTML).toBe('5+');
  });
});

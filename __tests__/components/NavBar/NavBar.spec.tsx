import React from 'react';
import { render } from '@testing-library/react';
import { NavBar } from '../../../src';
import '@testing-library/jest-dom';

describe('NavBar', () => {
  it('should render a NavBar', () => {
    render(<NavBar bgColor="green" style={{ width: '100%' }} />);

    const navBar = document.querySelector('.sha-el-nav-bar');
    expect(navBar).not.toBeNull();
    expect(navBar).toHaveStyle(`
      width: 100%;
      background: green;
    `);
  });
});

import React from 'react';
import { Breadcrumb } from '../../../src';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Breadcrumb', () => {
  it('should render a default breadcrumb', () => {
    render(
      <Breadcrumb seperator="/">
        <a href="#">Home</a>
        <a href="#">Breadcrumb</a>
      </Breadcrumb>,
    );

    const breadcrumb = document.querySelectorAll('li');

    expect(breadcrumb[0].innerHTML).toBe('<a href="#">Home</a>');
    expect(breadcrumb[0].children[0]).toHaveStyle(`
      color: rgba(0, 0, 0, 0.54);
    `);
    expect(breadcrumb[0]).toHaveStyle(`
      display: list-item;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.00938em;
      line-height: 1.5;
    `);

    expect(breadcrumb[1].innerHTML).toBe('/');

    expect(breadcrumb[2].innerHTML).toBe('<a href="#">Breadcrumb</a>');
    expect(breadcrumb[2].children[0]).toHaveStyle(`
      color: rgb(114, 114, 114);
    `);
  });

  it('should render a breadcrumb with different seprator', () => {
    render(
      <Breadcrumb seperator="=>">
        <a href="#">Home</a>
        <a href="#">Breadcrumb</a>
      </Breadcrumb>,
    );

    const breadcrumb = document.querySelectorAll('li');

    expect(breadcrumb[1].innerHTML).toBe('=&gt;');
  });

  it('should render a breadcrumb with one children', () => {
    render(
      <Breadcrumb seperator="/">
        <a href="#">Home</a>
      </Breadcrumb>,
    );

    const breadcrumb = document.querySelectorAll('li');

    expect(breadcrumb[0].innerHTML).toBe('<a href="#">Home</a>');
  });
});

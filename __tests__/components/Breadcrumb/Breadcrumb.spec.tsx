import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Breadcrumb } from '../../../src';

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

describe('Breadcrumb', () => {
  it('should render a default breadcrumb', () => {
    act(() => {
      ReactDOM.render(
        <Breadcrumb seperator=">" paths={[() => <a href="#">Home</a>, () => <a href="#">Breadcrumb</a>]} />,
        container,
      );
    });

    const breadcrumb = document.querySelectorAll('li');

    expect(breadcrumb[0].innerHTML).toBe('<a href="#">Home</a>');
    expect(breadcrumb[0].children[0]).toHaveStyle(`
      color: rgba(0, 0, 0, 0.87);
    `);
    expect(breadcrumb[0]).toHaveStyle(`
      display: inline-flex;
      font-size: 14px;
      align-items: center;
      font-weight: 500;
      line-height: 36px;
      letter-spacing: .0892857143em;
      justify-content: center;
    `);

    expect(breadcrumb[1].innerHTML).toBe('&gt;');

    expect(breadcrumb[2].innerHTML).toBe('<a href="#">Breadcrumb</a>');
    expect(breadcrumb[2].children[0]).toHaveStyle(`
      color: rgb(134, 152, 254);
    `);
  });

  it('should render a breadcrumb with different seprator', () => {
    act(() => {
      ReactDOM.render(
        <Breadcrumb seperator="=>" paths={[() => <a href="#">Home</a>, () => <a href="#">Breadcrumb</a>]} />,
        container,
      );
    });

    const breadcrumb = document.querySelectorAll('li');

    expect(breadcrumb[1].innerHTML).toBe('=&gt;');
  });
});

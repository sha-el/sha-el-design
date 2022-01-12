import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Button } from '../../../src';

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

describe('Button', () => {
  it('should render a default button with children', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button onClick={fn}>Save</Button>, container);
    });

    const button = document.querySelector('button');

    button.click();
    expect(fn).toBeCalledTimes(1);

    expect(button).toHaveStyle(`
      color: rgb(85, 85, 85);
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
      text-align: center;
      width: auto;
      border: none;
      cursor: pointer;
      height: 36px;
      display: inline-flex;
      padding: 0px 20px;
      font-size: 14px;
      background: rgb(235, 235, 235);
      box-sizing: border-box;
      text-align: center;
      font-weight: 500;
      line-height: 36px;
      white-space: nowrap;
      border-radius: 4px;
      letter-spacing: 1.25px;
      justify-content: center;
      text-decoration: none;
    `);
    expect(button.innerHTML).toBe('<span>Save</span>');
  });

  it('should render a primary button', () => {
    act(() => {
      ReactDOM.render(<Button primary />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);
  });

  it('should render a secondary button', () => {
    act(() => {
      ReactDOM.render(<Button secondary />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      background: rgb(240, 98, 146);
    `);
  });

  it('should render a danger button', () => {
    act(() => {
      ReactDOM.render(<Button danger />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      background: rgb(244, 67, 54);
    `);
  });

  it('should render a link', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button link onClick={fn} />, container);
    });

    const button = document.querySelector('a');

    button.click();
    expect(button).not.toBeNull();
    expect(fn).toBeCalledTimes(1);
  });

  it('should render a small button', () => {
    act(() => {
      ReactDOM.render(<Button size="small" />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      height: 30px;
      padding: 0px 20px;
      font-size: 12px;
    `);
  });

  it('should render a big button', () => {
    act(() => {
      ReactDOM.render(<Button size="big" />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      height: 40px;
      padding: 0px 30px;
      font-size: 16px;
    `);
  });

  it('should render a default circle button', () => {
    act(() => {
      ReactDOM.render(<Button shape="circle" />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      width: 36px;
      height: 36px;
      padding: 0px;
      font-size: 14px;
      line-height: 41px;
      border-radius: 50%;
    `);
  });

  it('should render a small circle button', () => {
    act(() => {
      ReactDOM.render(<Button shape="circle" size="small" />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      width: 30px;
      height: 30px;
      padding: 0px;
      font-size: 12px;
      line-height: 35px;
      border-radius: 50%;
    `);
  });

  it('should render a big circle button', () => {
    act(() => {
      ReactDOM.render(<Button shape="circle" size="big" />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      width: 40px;
      height: 40px;
      padding: 0px;
      font-size: 16px;
      line-height: 45px;
      border-radius: 50%;
    `);
  });

  it('should render a block button', () => {
    act(() => {
      ReactDOM.render(<Button displayBlock />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      width: 100%;
    `);
  });

  it('should render a flat button', () => {
    act(() => {
      ReactDOM.render(<Button flat />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      color: rgb(85, 85, 85);
      box-shadow: none;
      padding: 0px 5px;
      background: transparent;
    `);
  });

  it('should render a outline button', () => {
    act(() => {
      ReactDOM.render(<Button outline />, container);
    });

    const button = document.querySelector('button');

    expect(button).toHaveStyle(`
      color: rgb(85, 85, 85);
      box-shadow: none;
      border: 1px solid #555555;
      background: transparent;
    `);
  });

  it('should not allow click while loading', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button loading onClick={fn} />, container);
    });

    const button = document.querySelector('button');

    button.click();
    expect(fn).toBeCalledTimes(0);

    expect(button).toHaveStyle(`
      cursor: wait;
    `);
  });

  it('should render a custom component', () => {
    act(() => {
      ReactDOM.render(<Button component={<p />} />, container);
    });

    const button = container.querySelector('p');

    expect(button).not.toBeNull();
  });

  it('should not allow click if disabled', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button disabled onClick={fn} />, container);
    });

    const button = document.querySelector('button');

    button.click();
    expect(fn).toBeCalledTimes(0);

    expect(button.disabled).toBeTruthy();
    expect(button).toHaveStyle(`
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.2);
  `);
  });

  it('should render a custom anchor component', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button link component={<a id="hello" />} onClick={fn} />, container);
    });

    expect(document.getElementById('hello')).toBeDefined();
  });

  it('should render a custom anchor component which is not clickable while loading', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button link component={<a id="hello" />} loading onClick={fn} />, container);
    });

    const button = document.getElementById('hello');

    button.click();
    expect(fn).toBeCalledTimes(0);
  });

  it('should render a custom button component which is not clickable while loading', () => {
    const fn = jest.fn();

    act(() => {
      ReactDOM.render(<Button component={<a id="hello" />} loading onClick={fn} />, container);
    });

    const button = document.getElementById('hello');

    button.click();
    expect(fn).toBeCalledTimes(0);
  });
});

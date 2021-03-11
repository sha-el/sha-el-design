import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Tag } from '../../../src';

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

describe('Tag', () => {
  const fn = jest.fn();

  it('should render a default tag with children', () => {
    act(() => {
      ReactDOM.render(
        <Tag color="red" onClick={fn}>
          Basic
        </Tag>,
        container,
      );
    });

    const tag = document.querySelector('span');

    tag.click();
    expect(fn).toBeCalledTimes(1);

    expect(tag.innerHTML).toBe('Basic');
    expect(tag).toHaveStyle(`
    color: rgb(255, 255, 255);
    height: 36px;
    margin: 5px;
    display: inline-flex;
    padding: 0px 20px;
    font-size: 0.8125rem;
    min-width: 64px;
    background: red;
    box-shadow: 0 3px 1px -2px #E8EAFC,0 2px 2px 0 #B2B2B21A,0 1px 5px 0 #9A9A9A1A;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    font-weight: 500;
    line-height: 36px;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    `);
  });

  it('should change text color', () => {
    act(() => {
      ReactDOM.render(
        <Tag color="black" textColor="red">
          Blue Text
        </Tag>,
        container,
      );

      const tag = document.querySelector('span');

      expect(tag).toHaveStyle(`
        color: red;
      `);
    });
  });

  it('should add custom styles', () => {
    act(() => {
      ReactDOM.render(
        <Tag color="red" style={{ padding: '10px' }}>
          Style
        </Tag>,
        container,
      );
    });

    const tag = document.querySelector('span');

    expect(tag).toHaveStyle(`
      padding: 10px;
    `);
  });

  it('should render an outline tag', () => {
    act(() => {
      ReactDOM.render(
        <Tag color="red" outline>
          Outline
        </Tag>,
        container,
      );

      const tag = document.querySelector('span');

      expect(tag).toHaveStyle(`
        border: 1px solid red;
        color: red;
      `);
    });
  });

  it('should render a chip tag', () => {
    act(() => {
      ReactDOM.render(
        <Tag color="red" chips>
          Chip
        </Tag>,
        container,
      );
    });

    const chip = document.querySelector('svg');

    expect(chip).not.toBeNull();
  });

  it('should render a small tag', () => {
    act(() => {
      ReactDOM.render(
        <Tag color="red" size="SMALL">
          Small
        </Tag>,
        container,
      );
    });

    const tag = document.querySelector('span');

    expect(tag).toHaveStyle(`
    padding: 0 14px;
    minWidth: 50px;
    lineHeight: 22px;
    height: 22px;
    fontSize: 0.7125rem;
    `);
  });

  it('should render a tag with onClick prop', () => {
    let clickCount = 0;
    const onClick = () => (clickCount += 1);

    act(() => {
      ReactDOM.render(
        <Tag color="red" onClick={onClick}>
          {' '}
          Hello{' '}
        </Tag>,
        container,
      );
    });

    const tag = document.querySelector('span');

    tag.click();

    expect(clickCount).toBe(1);
  });
});

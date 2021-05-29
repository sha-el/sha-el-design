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

    expect(tag.innerHTML).toBe('<span>Basic</span>');
    expect(tag).toHaveStyle(`
    border-radius: 2px;
    box-shadow: 0px 3px 1px -2px rgba(34,41,47,0.12),0px 2px 2px 0px rgba(34,41,47,0.08),0px 1px 5px 0px rgba(34,41,47,0.05);
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    font-weight: bold;
    line-height: 36px;
    letter-spacing: 1px;
    line-height: 22px;
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

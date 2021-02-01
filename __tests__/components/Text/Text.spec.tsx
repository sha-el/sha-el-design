import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Text } from '../../../src';

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

describe('Text', () => {
  it('should render a default text', () => {
    act(() => {
      ReactDOM.render(<Text color="light">Deafult Text</Text>, container);
    });

    const text = document.querySelector('span');
    text.click();

    expect(text).toHaveStyle(`
      font-style: normal;
      color: rgba(0, 0, 0, 0.54);
    `);
  });

  it('should render a h1 text', () => {
    act(() => {
      ReactDOM.render(<Text variant="h1">This is a h1 Heading.</Text>, container);
    });

    const text = document.querySelector('h1');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a h1 Heading.');
  });

  it('should render a h2 text', () => {
    act(() => {
      ReactDOM.render(<Text variant="h2">This is a h2 Heading.</Text>, container);
    });

    const text = document.querySelector('h2');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a h2 Heading.');
  });

  it('should render a h3 text', () => {
    act(() => {
      ReactDOM.render(<Text variant="h3">This is a h3 Heading.</Text>, container);
    });

    const text = document.querySelector('h3');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a h3 Heading.');
  });

  it('should render a h4 text', () => {
    act(() => {
      ReactDOM.render(<Text variant="h4">This is a h4 Heading.</Text>, container);
    });

    const text = document.querySelector('h4');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a h4 Heading.');
  });

  it('should render a h5 text', () => {
    act(() => {
      ReactDOM.render(<Text variant="h5">This is a h5 Heading.</Text>, container);
    });

    const text = document.querySelector('h5');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a h5 Heading.');
  });

  it('should render a h6 text', () => {
    act(() => {
      ReactDOM.render(<Text variant="h6">This is a h6 Heading.</Text>, container);
    });

    const text = document.querySelector('h6');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a h6 Heading.');
  });

  it('should render a paragraph', () => {
    act(() => {
      ReactDOM.render(<Text variant="p">This is a paragraph.</Text>, container);
    });

    const text = document.querySelector('p');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a paragraph.');
  });

  it('should render a label', () => {
    act(() => {
      ReactDOM.render(<Text variant="label">This is a label.</Text>, container);
    });

    const text = document.querySelector('label');

    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('This is a label.');
  });

  it('should render an italic text', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" italicize>
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      font-style: italic;
    `);
  });

  it('should render a text with custom font', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" fontFamily="cursive">
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      font-family: cursive;
    `);
  });

  it('should render a text of custom size', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" fontSize="14px">
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      font-size: 14px;
    `);
  });

  it('should render a text with custom padding', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" padding="20px">
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      padding: 20px;
    `);
  });

  it('should render a text with custom margin', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" margin="20px">
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      margin: 20px;
    `);
  });

  it('should render a text of custom color', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" color="red">
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      color: red;
    `);
  });

  it('should render an underline text', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" underline>
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      text-decoration: underline;
    `);
  });

  it('should render a strikeThrough text', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" strikeThrough>
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      text-decoration: line-through;
    `);
  });

  it('should render a text with custom styles', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" style={{ border: '1px solid black' }}>
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      border: 1px solid black;
    `);
  });

  it('should render a text with custom font weight', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" fontWeight={700}>
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      font-weight: 700;
    `);
  });

  it('should render a text with font weight equal to 0', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" fontWeight={0}>
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).not.toHaveStyle(`
      font-weight: normal;
    `);
  });

  it('should render a text with custom alignment', () => {
    act(() => {
      ReactDOM.render(
        <Text variant="p" textAlign="right">
          The quick brown fox jumps over the lazy dog
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    expect(text).toHaveStyle(`
      text-align: right;
    `);
  });

  it('should render a text with onClick prop', () => {
    let clickCount = 0;
    const onClick = () => (clickCount += 1);

    act(() => {
      ReactDOM.render(
        <Text variant="p" onClick={onClick}>
          {' '}
          Hello, World!{' '}
        </Text>,
        container,
      );
    });

    const text = document.querySelector('p');

    text.click();

    expect(clickCount).toBe(1);
  });
});

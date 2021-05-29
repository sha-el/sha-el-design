import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Collapse } from '../../../src';
import { act } from 'react-dom/test-utils';

const BasicCollapse = () => {
  const [open, updateOpen] = React.useState(false);
  return (
    <Collapse header="Hello" isOpen={open} onChange={updateOpen}>
      Hello world!!
    </Collapse>
  );
};

const AcordianCollapse = () => {
  const [open, updateOpen] = React.useState([false, false, true]);

  const onUpdate = (val: boolean, index: number) => {
    const values = [];
    values[index] = val;
    updateOpen(values);
  };

  return (
    <>
      <Collapse header="First" isOpen={open[0]} onChange={(v) => onUpdate(v, 0)}>
        First Panel
      </Collapse>
      <Collapse header="Second" isOpen={open[1]} onChange={(v) => onUpdate(v, 1)}>
        Second Panel
      </Collapse>
      <Collapse header="Third" isOpen={open[2]} onChange={(v) => onUpdate(v, 2)}>
        Third Panel
      </Collapse>
    </>
  );
};

describe('Collapse', () => {
  it('Should render a basic collapse', () => {
    render(<BasicCollapse />);

    expect(document.querySelector('ul')).toHaveStyle(`
      border-radius: 0;
    `);

    act(() => {
      fireEvent.click(document.querySelector('li').querySelectorAll('div')[2]);
    });

    expect(document.querySelector('ul').querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 100vh;
    `);

    const CollapsibleElement = document.querySelector('ul').querySelectorAll('div')[5];
    expect(CollapsibleElement).toHaveStyle(`
      overflow: hidden;
      box-sizing: border-box;
      padding: 20px 0 30px 20px;
    `);

    act(() => {
      fireEvent.click(document.querySelector('li').querySelectorAll('div')[2]);
    });

    expect(document.querySelector('ul').querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
  });

  it('Should test onChange of collapse', () => {
    const fn = jest.fn();
    render(
      <Collapse header="Hello" isOpen={false} onChange={fn}>
        Hello world!!
      </Collapse>,
    );

    act(() => {
      fireEvent.click(document.querySelector('li').querySelectorAll('div')[2]);
    });
    expect(fn).toBeCalledTimes(1);
  });

  it('Should render acordian collapse', () => {
    render(<AcordianCollapse />);

    const acordianCollapse = document.querySelectorAll('ul');

    expect(acordianCollapse[0].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
    expect(acordianCollapse[1].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
    expect(acordianCollapse[2].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 100vh;
    `);

    act(() => {
      fireEvent.click(acordianCollapse[0].querySelectorAll('div')[3]);
    });

    expect(acordianCollapse[0].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 100vh;
    `);
    expect(acordianCollapse[1].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
    expect(acordianCollapse[2].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);

    act(() => {
      fireEvent.click(acordianCollapse[1].querySelectorAll('div')[3]);
    });

    expect(acordianCollapse[0].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
    expect(acordianCollapse[1].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 100vh;
    `);
    expect(acordianCollapse[2].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);

    act(() => {
      fireEvent.click(acordianCollapse[2].querySelectorAll('div')[3]);
    });

    expect(acordianCollapse[0].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
    expect(acordianCollapse[1].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);
    expect(acordianCollapse[2].querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 100vh;
    `);
  });
});

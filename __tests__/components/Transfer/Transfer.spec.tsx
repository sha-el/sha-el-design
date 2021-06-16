import React from 'react';
import { Transfer } from '../../../src/components/Transfer';

import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';

const CreateTransfer = () => {
  const [values, update] = React.useState(['Banner', 'Stark', 'Steve']);

  return (
    <Transfer
      data={['Bruce', 'Clark', 'Arthur', 'Diana', 'Banner', 'Stark', 'Steve']}
      values={values}
      onChange={update}
      listDisplayProp={(e) => e}
      uniqueIdentifier={(e) => e}
    />
  );
};

describe('Transfer', () => {
  it('Should render a transfer', () => {
    render(<CreateTransfer />);

    const transfer = document.querySelector('.sha-el-transfer');
    expect(transfer).toHaveStyle(`
      min-width: 500px;
    `);

    const listColumn = transfer.querySelector('.list-column');
    const listHeader = listColumn.querySelector('span');
    expect(listHeader.innerHTML).toBe('4 item(s)');
    const lists = listColumn.querySelectorAll('li');
    expect(lists.length).toBe(4);

    const buttonColumn = transfer.querySelector('.button-column');

    const toRightButton = buttonColumn.querySelectorAll('button')[0];
    expect(toRightButton.querySelector('svg').innerHTML).toContain('M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'); // Path for MdKeyboardArrowRight

    const toLeftButton = buttonColumn.querySelectorAll('button')[1];
    expect(toLeftButton.querySelector('svg').innerHTML).toContain('M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'); // Path for MdKeyboardArrowLeft

    const valueColumn = transfer.querySelector('.value-column');
    const valueHeader = valueColumn.querySelector('span');
    expect(valueHeader.innerHTML).toBe('3 item(s)');
    const values = valueColumn.querySelectorAll('li');
    expect(values.length).toBe(3);
  });

  it('Should transfer items to right', () => {
    render(<CreateTransfer />);

    let listColumn = document.querySelector('.list-column');
    let lists = listColumn.querySelectorAll('li');
    act(() => {
      fireEvent.click(lists[1]);
    });

    const buttonColumn = document.querySelector('.button-column');
    const toRightButton = buttonColumn.querySelectorAll('button')[0];
    act(() => {
      fireEvent.click(toRightButton);
    });

    listColumn = document.querySelector('.list-column');
    lists = listColumn.querySelectorAll('li');
    expect(lists.length).toBe(3);

    const valueColumn = document.querySelector('.value-column');
    const values = valueColumn.querySelectorAll('li');
    expect(values.length).toBe(4);
  });

  it('Should transfer multiple items to right', () => {
    render(<CreateTransfer />);

    let listColumn = document.querySelector('.list-column');
    let lists = listColumn.querySelectorAll('li');
    act(() => {
      fireEvent.click(lists[0]);
      fireEvent.click(lists[1]);
    });

    const buttonColumn = document.querySelector('.button-column');
    const toRightButton = buttonColumn.querySelectorAll('button')[0];
    act(() => {
      fireEvent.click(toRightButton);
    });

    listColumn = document.querySelector('.list-column');
    lists = listColumn.querySelectorAll('li');
    expect(lists.length).toBe(2);

    const valueColumn = document.querySelector('.value-column');
    const values = valueColumn.querySelectorAll('li');
    expect(values.length).toBe(5);
  });

  it('Should trasfer items to left', () => {
    render(<CreateTransfer />);

    let valueColumn = document.querySelector('.value-column');
    let values = valueColumn.querySelectorAll('li');
    act(() => {
      fireEvent.click(values[0]);
    });

    const buttonColumn = document.querySelector('.button-column');
    const toLeftButton = buttonColumn.querySelectorAll('button')[1];
    act(() => {
      fireEvent.click(toLeftButton);
    });

    valueColumn = document.querySelector('.value-column');
    values = valueColumn.querySelectorAll('li');
    expect(values.length).toBe(2);

    const listColumn = document.querySelector('.list-column');
    const lists = listColumn.querySelectorAll('li');
    expect(lists.length).toBe(5);
  });

  it('Should transfer multiple items to left', () => {
    render(<CreateTransfer />);

    let valueColumn = document.querySelector('.value-column');
    let values = valueColumn.querySelectorAll('li');
    act(() => {
      fireEvent.click(values[0]);
      fireEvent.click(values[1]);
    });

    const buttonColumn = document.querySelector('.button-column');
    const toLeftButton = buttonColumn.querySelectorAll('button')[1];
    act(() => {
      fireEvent.click(toLeftButton);
    });

    valueColumn = document.querySelector('.value-column');
    values = valueColumn.querySelectorAll('li');
    expect(values.length).toBe(1);

    const listColumn = document.querySelector('.list-column');
    const lists = listColumn.querySelectorAll('li');
    expect(lists.length).toBe(6);
  });

  it('Should select and unselect an item', () => {
    render(<CreateTransfer />);

    let listColumn = document.querySelector('.list-column');
    let lists = listColumn.querySelectorAll('li');
    act(() => {
      fireEvent.click(lists[1]);
    });

    listColumn = document.querySelector('.list-column');
    lists = listColumn.querySelectorAll('li');
    act(() => {
      fireEvent.click(lists[1]);
    });

    const buttonColumn = document.querySelector('.button-column');
    const toRightButton = buttonColumn.querySelectorAll('button')[0];
    expect(toRightButton.disabled).toBeTruthy();
  });
});

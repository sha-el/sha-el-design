import React from 'react';
import { Pagination } from '../../../src/components/Pagination';

import '@testing-library/jest-dom';
import { render, act, fireEvent } from '@testing-library/react';

const CreatePagination = (props: { itemsPerPage?: number[]; justify?: string }) => {
  const [pageNumber, updatePageNumber] = React.useState(4);
  const [pageSize, updatePageSize] = React.useState(10);
  return (
    <Pagination
      batchSize={pageSize}
      currentPage={pageNumber}
      onChange={(np: number, pg: number) => {
        updatePageNumber(np);
        updatePageSize(pg);
      }}
      totalCount={100}
      itemsPerPage={props.itemsPerPage}
      justify={props.justify}
    />
  );
};

describe('Pagination', () => {
  it('Should render a basic pagination', () => {
    render(<CreatePagination />);

    const pagination = document.querySelector('.sha-el-pagination');
    expect(pagination.querySelectorAll('.sha-el-col').length).toBe(4);
    expect(pagination).toHaveStyle(`
      align-items: center;
    `);

    const text = pagination.querySelectorAll('.sha-el-col')[0];
    expect(text.innerHTML).toContain('31 - 40 of 100');
    expect(text).toHaveStyle(`
      flex: 0 1 auto;
    `);
    expect(text.querySelector('span')).toHaveStyle(`
      color: rgba(0, 0, 0, 0.54);
    `);

    const backArrow = pagination.querySelectorAll('.sha-el-col')[1];
    expect(backArrow).toHaveStyle(`
      flex: 0 1 auto;
    `);
    expect(backArrow.querySelector('svg').innerHTML).toContain(
      // Path for IoIosArrowBack
      'M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z',
    );

    const currentPage = pagination.querySelectorAll('.sha-el-col')[2];
    expect(currentPage.innerHTML).toBe('4');

    const forwardArrow = pagination.querySelectorAll('.sha-el-col')[3];
    expect(forwardArrow).toHaveStyle(`
      flex: 0 1 auto;
    `);
    expect(forwardArrow.querySelector('svg').innerHTML).toContain(
      // Path for IoIosArrowForward
      'M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z',
    );
  });

  it('Should re-render pagination when clicked on next button', () => {
    render(<CreatePagination />);

    const pagination = document.querySelector('.sha-el-pagination');
    const forwardArrow = pagination.querySelectorAll('.sha-el-col')[3].querySelector('button');

    act(() => {
      fireEvent.click(forwardArrow);
    });

    const text = pagination.querySelectorAll('.sha-el-col')[0];
    expect(text.innerHTML).toContain('41 - 50 of 100');

    const currentPage = pagination.querySelectorAll('.sha-el-col')[2];
    expect(currentPage.innerHTML).toBe('5');
  });

  it('Should re-render pagination when clicked on back button', () => {
    render(<CreatePagination />);

    const pagination = document.querySelector('.sha-el-pagination');
    const backArrow = pagination.querySelectorAll('.sha-el-col')[1].querySelector('button');

    act(() => {
      fireEvent.click(backArrow);
    });

    const text = pagination.querySelectorAll('.sha-el-col')[0];
    expect(text.innerHTML).toContain('21 - 30 of 100');

    const currentPage = pagination.querySelectorAll('.sha-el-col')[2];
    expect(currentPage.innerHTML).toBe('3');
  });

  it('Should render pagination with items per page', () => {
    render(<CreatePagination itemsPerPage={[10, 20, 30]} />);

    const pagination = document.querySelector('.sha-el-pagination');
    let itemsPerPage = pagination.querySelector('.sha-el-input');
    expect(itemsPerPage.querySelector('input').value).toBe('10');

    act(() => {
      fireEvent.click(itemsPerPage);
    });

    act(() => {
      fireEvent.click(document.querySelectorAll('li')[1]);
    });

    itemsPerPage = pagination.querySelector('.sha-el-input');
    expect(itemsPerPage.querySelector('input').value).toBe('20');

    const text = pagination.querySelectorAll('.sha-el-col')[3];
    expect(text.innerHTML).toContain('1 - 20 of 100');

    const currentPage = pagination.querySelectorAll('.sha-el-col')[5];
    expect(currentPage.innerHTML).toBe('1');
  });

  it('Should render a pagination with justify prop', () => {
    render(<CreatePagination justify="flex-end" />);

    const pagination = document.querySelector('.sha-el-pagination');
    expect(pagination).toHaveStyle(`
      justify-content: flex-end;
    `);
  });

  it('Should render a pagination with onChnage', () => {
    const fn = jest.fn();
    render(<Pagination batchSize={10} currentPage={3} onChange={fn} totalCount={100} itemsPerPage={[10, 20, 30]} />);

    const pagination = document.querySelector('.sha-el-pagination');

    const itemsPerPage = pagination.querySelector('.sha-el-input');
    act(() => {
      fireEvent.click(itemsPerPage);
    });
    act(() => {
      fireEvent.click(document.querySelectorAll('li')[1]);
    });
    expect(fn).toBeCalledTimes(1);

    const backArrow = pagination.querySelectorAll('.sha-el-col')[4].querySelector('button');
    act(() => {
      fireEvent.click(backArrow);
    });
    expect(fn).toBeCalledTimes(2);

    const forwardArrow = pagination.querySelectorAll('.sha-el-col')[6].querySelector('button');
    act(() => {
      fireEvent.click(forwardArrow);
    });
    expect(fn).toBeCalledTimes(3);
  });

  it('Should render a pagination without onChange', () => {
    render(<Pagination batchSize={10} currentPage={3} totalCount={100} itemsPerPage={[10, 20, 30]} />);

    const pagination = document.querySelector('.sha-el-pagination');

    let text = pagination.querySelectorAll('.sha-el-col')[3];
    expect(text.innerHTML).toContain('21 - 30 of 100');

    const itemsPerPage = pagination.querySelector('.sha-el-input');
    act(() => {
      fireEvent.click(itemsPerPage);
    });
    act(() => {
      fireEvent.click(document.querySelectorAll('li')[1]);
    });

    text = pagination.querySelectorAll('.sha-el-col')[3];
    expect(text.innerHTML).toContain('21 - 30 of 100');

    const backArrow = pagination.querySelectorAll('.sha-el-col')[4].querySelector('button');
    act(() => {
      fireEvent.click(backArrow);
    });

    text = pagination.querySelectorAll('.sha-el-col')[3];
    expect(text.innerHTML).toContain('21 - 30 of 100');

    const forwardArrow = pagination.querySelectorAll('.sha-el-col')[6].querySelector('button');
    act(() => {
      fireEvent.click(forwardArrow);
    });

    text = pagination.querySelectorAll('.sha-el-col')[3];
    expect(text.innerHTML).toContain('21 - 30 of 100');
  });

  it('Should render a pagination with totalCount equal to 0', () => {
    render(<Pagination batchSize={10} currentPage={3} totalCount={0} />);

    const pagination = document.querySelector('.sha-el-pagination');

    const text = pagination.querySelectorAll('.sha-el-col')[0];
    expect(text.innerHTML).toContain('0 - 0 of 0');
  });
});

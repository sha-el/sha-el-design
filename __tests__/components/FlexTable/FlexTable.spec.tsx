import React from 'react';
import { FlexTable } from '../../../src/components/FlexTable';
import { List, ListItem } from '../../../src/components/List';
import { Pagination } from '../../../src/components/Pagination';

import '@testing-library/jest-dom';
import MOCK_DATA from '../../__mocks__/data';
import { fireEvent, render, act } from '@testing-library/react';

type DataType = typeof MOCK_DATA[0];

const WithPagination = () => {
  const [pageNumber, updatePageNumber] = React.useState(1);
  const [pageSize, updatePageSize] = React.useState(10);
  return (
    <FlexTable
      data={MOCK_DATA.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)}
      pagination={
        <Pagination
          justify="flex-end"
          itemsPerPage={[10, 20, 30]}
          batchSize={pageSize}
          currentPage={pageNumber}
          totalCount={MOCK_DATA.length}
          onChange={(np, pg) => {
            updatePageNumber(np);
            updatePageSize(pg);
          }}
        />
      }
    >
      <FlexTable.Column key="Id" span={2} header="Id">
        {(data: DataType) => data.id}
      </FlexTable.Column>
      <FlexTable.Column key="First Name" span={5} header="First Name">
        {(data: DataType) => data.first_name}
      </FlexTable.Column>
      <FlexTable.Column key="Last Name" span={5} header="Last Name">
        {(data: DataType) => data.last_name}
      </FlexTable.Column>
      <FlexTable.Column key="Email" span={8} header="Email">
        {(data: DataType) => data.email}
      </FlexTable.Column>
      <FlexTable.Column key="Car Model Year" span={4} header="Year">
        {(data: DataType) => data['car model year']}
      </FlexTable.Column>
    </FlexTable>
  );
};

describe('FlexTable', () => {
  it('Should render a default flex table', () => {
    render(
      <FlexTable data={MOCK_DATA.slice(0, 2)}>
        <FlexTable.Column key="Id" span={1} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
        <FlexTable.Column key="First Name" span={3} header="First Name">
          {(data: DataType) => data.first_name}
        </FlexTable.Column>
        <FlexTable.Column key="Last Name" span={3} header="Last Name">
          {(data: DataType) => data.last_name}
        </FlexTable.Column>
        <FlexTable.Column key="Email" span={5} header="Email">
          {(data: DataType) => data.email}
        </FlexTable.Column>
        <FlexTable.Column key="Gender" span={2} header="Gender">
          {(data: DataType) => data.gender}
        </FlexTable.Column>
        <FlexTable.Column key="Car Make" span={3} header="Car Make">
          {(data: DataType) => data['car make']}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model" span={3} header="Model">
          {(data: DataType) => data['car model']}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={2} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');
    expect(table).toHaveStyle(`
      overflow-x: auto;
      padding: 0;
    `);
    expect(table).toHaveStyle(`
      min-width: 100px;
    `);

    expect(table.querySelectorAll('.list-item').length).toBe(3);

    const header = table.querySelector('li');
    expect(header).toHaveStyle(`
      font-weight: 500;
      font-size: 12px;
      cursor: default;
      border-bottom: 2px solid #9A9A9A1A;
      text-transform: uppercase;
      letter-spacing: .5px;
      word-wrap: break-word;
      box-sizing: border-box;
    `);
    expect(header).toHaveStyle(`
      background: rgb(255, 255, 255);
      align-items: center;
      display: flex;
    `);

    const headerContent = header.querySelector('.sha-el-row');
    expect(headerContent).toHaveStyle(`
      align-items: stretch;
      display: flex;
    `);

    const headerCells = headerContent.querySelectorAll('.sha-el-col');
    expect(headerCells.length).toBe(8);
    expect(headerCells[0]).toHaveStyle(`
      overflow: hidden;
      padding: 0px 16px;
    `);

    expect(headerCells[0].innerHTML).toBe('Id');
    expect(headerCells[1].innerHTML).toBe('First Name');
    expect(headerCells[2].innerHTML).toBe('Last Name');
    expect(headerCells[3].innerHTML).toBe('Email');
    expect(headerCells[4].innerHTML).toBe('Gender');
    expect(headerCells[5].innerHTML).toBe('Car Make');
    expect(headerCells[6].innerHTML).toBe('Model');
    expect(headerCells[7].innerHTML).toBe('Year');

    const tableRow = table.querySelectorAll('.list-item')[1];
    expect(tableRow).toHaveStyle(`
      padding: 0;
      cursor: pointer;
      border-bottom: 1px solid #E8EAFC;
      border-collapse: collapse;
    `);
    expect(tableRow.querySelector('.sha-el-row')).toHaveStyle(`
      align-items: stretch;
    `);

    const tableCells = tableRow.querySelectorAll('.sha-el-col');
    expect(tableCells[0].innerHTML).toBe('1');
    expect(tableCells[1].innerHTML).toBe('Ninon');
    expect(tableCells[2].innerHTML).toBe('Switsur');
    expect(tableCells[3].innerHTML).toBe('nswitsur0@cbslocal.com');
    expect(tableCells[4].innerHTML).toBe('Female');
    expect(tableCells[5].innerHTML).toBe('Toyota');
    expect(tableCells[6].innerHTML).toBe('Yaris');
    expect(tableCells[7].innerHTML).toBe('2006');
  });

  it('Should render a flex table with single header', () => {
    render(
      <FlexTable data={MOCK_DATA.slice(0, 2)}>
        <FlexTable.Column key="Id" span={1} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');
    const header = table.querySelector('.list-item');

    expect(header.querySelectorAll('.table-cell').length).toBe(1);
  });

  it('Should render an empty flex table', () => {
    render(
      <FlexTable data={[]}>
        <FlexTable.Column key="Id" span={2} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
        <FlexTable.Column key="First Name" span={5} header="First Name">
          {(data: DataType) => data.first_name}
        </FlexTable.Column>
        <FlexTable.Column key="Last Name" span={5} header="Last Name">
          {(data: DataType) => data.last_name}
        </FlexTable.Column>
        <FlexTable.Column key="Email" span={8} header="Email">
          {(data: DataType) => data.email}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={4} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');
    expect(table.querySelectorAll('.list-item').length).toBe(1);

    const emptyState = table.querySelector('.empty-state');
    expect(emptyState).toHaveStyle(`
      color: rgba(0, 0, 0, 0.54);
      background: #ffffff;
      text-align: center;
      padding: 50px;
      font-size: 16px;
    `);
    expect(emptyState.querySelectorAll('div')[1].innerHTML).toBe('No Data');

    const emptyStateImage = emptyState.querySelector('svg');
    expect(emptyStateImage.innerHTML).toContain(
      // Path for GiEmptyMetalBucket
      'M256 137c-43.5 0-82.8 5.4-110.6 13.7-13.8 4.1-24.8 9.1-31.6 14-6.9 4.8-8.8 8.7-8.8 11.3 0 1.7.8 3.9 3.2 6.5 13.3-9.1 30.1-15.9 48.9-21.2C186.6 153 221.3 149 256 149s69.4 4 98.9 12.3c18.8 5.3 35.6 12.1 48.9 21.2 2.4-2.6 3.2-4.8 3.2-6.5 0-2.6-1.9-6.5-8.8-11.3-6.8-4.9-17.8-9.9-31.6-14-27.8-8.3-67.1-13.7-110.6-13.7zm0 30c-33.3 0-66.6 4-94.1 11.7-14.2 4-26.8 9.1-37 14.9 5.8 2.7 12.7 5.4 20.5 7.7 27.8 8.3 67.1 13.7 110.6 13.7s82.8-5.4 110.6-13.7c7.8-2.3 14.7-5 20.5-7.7-10.2-5.8-22.8-10.9-37-14.9C322.6 171 289.3 167 256 167zm-147.4 38.4c-.6.6-1.2 1.1-1.8 1.7l1.7 14.4c31 18.6 89.4 29.5 147.5 29.5 11.6 0 23.3-.4 34.7-1.3.2-6 .2-11.9.2-17.8-11.3.7-22.9 1.1-34.9 1.1-44.9 0-85.6-5.4-115.7-14.4-12.5-3.8-23.1-8.1-31.7-13.2zm294.8 0c-7.5 4.5-16.7 8.3-27.2 11.8-.2 5.4-.5 11-.8 16.8 10.8-3.6 20.3-7.8 28.1-12.5l1.7-14.4c-.6-.5-1.2-1.1-1.8-1.7zm-77.8 22.9c-5.4.8-11 1.5-16.7 2.1 0 5.8 0 11.7-.1 17.6 5.5-.6 11-1.4 16.3-2.2.3-5.8.4-11.7.5-17.5zm-214.5 15.1l25.5 217c6.5 8.1 21.9 16.5 42.7 21.9 22 5.7 49.3 8.7 76.7 8.7h4.5c13.9-75 26.4-149.6 29.6-223.1-11.2.7-22.7 1.1-34.1 1.1-54 0-107.9-7.7-144.9-25.6zm289.8 0c-8.2 3.9-17.1 7.4-26.7 10.4-5.7 83.6-18.9 187.9-24.8 223.1 12.3-4.9 21.4-10.8 26-16.5l25.5-217zm-76.7 21.1c-5.3.7-10.6 1.4-16 1.9-3 74.5-15.5 149.3-29.3 223.9 5.2-.3 10.3-.8 15.3-1.3 13.3-75.4 25.7-150.6 30-224.5z',
    );
  });

  it('Should render a flex table with onRowClick prop', () => {
    const fn = jest.fn();
    render(
      <FlexTable data={MOCK_DATA.slice(0, 4)} onRowClick={fn}>
        <FlexTable.Column key="Id" span={1} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');
    const tableRows = table.querySelectorAll('.list-item');

    act(() => {
      fireEvent.click(tableRows[0]);
    });
    act(() => {
      fireEvent.click(tableRows[1]);
    });
    act(() => {
      fireEvent.click(tableRows[3]);
    });

    expect(fn).toBeCalledTimes(2); // fn not called when clicked on header.
  });

  it('Should render a nested expandable table', async () => {
    render(
      <FlexTable
        nested={{
          render: (data) => (
            <List>
              <ListItem avatar={<img src={data.avatar} />} key="Gender">
                {data.gender}
              </ListItem>
            </List>
          ),
          exapandable: (data) => data['car model year'] < 2007,
        }}
        data={MOCK_DATA.slice(0, 2)}
      >
        <FlexTable.Column key="Id" span={2} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
        <FlexTable.Column key="First Name" span={5} header="First Name">
          {(data: DataType) => data.first_name}
        </FlexTable.Column>
        <FlexTable.Column key="Last Name" span={5} header="Last Name">
          {(data: DataType) => data.last_name}
        </FlexTable.Column>
        <FlexTable.Column key="Email" span={10} header="Email">
          {(data: DataType) => data.email}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={2} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('.sha-el-flex-table');
    const tableRows = table.querySelectorAll('.list-item');
    const collapsibleColumn = tableRows[1];
    expect(collapsibleColumn).toHaveStyle(`
      cursor: pointer;
    `);
    expect(collapsibleColumn.querySelector('svg').innerHTML).toContain('M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z');

    expect(table.querySelector('.nested-content')).toBeNull();

    await act(async () => {
      fireEvent.click(collapsibleColumn);
    });

    const nestedContent = table.querySelector('.nested-content');

    expect(nestedContent.parentElement).toHaveStyle(`
      max-height: 100vh;
    `);
    expect(nestedContent).toHaveStyle(`
      margin-left: -20px;
    `);
    expect(nestedContent.querySelector('ul')).toBeDefined();
  });

  it('Should render a nested non-expandable table', () => {
    render(
      <FlexTable
        nested={{
          render: (data) => (
            <List>
              <ListItem avatar={<img src={data.avatar} />} key="Gender">
                {data.gender}
              </ListItem>
            </List>
          ),
        }}
        data={MOCK_DATA.slice(0, 1)}
      >
        <FlexTable.Column key="Id" span={2} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
        <FlexTable.Column key="First Name" span={5} header="First Name">
          {(data: DataType) => data.first_name}
        </FlexTable.Column>
        <FlexTable.Column key="Last Name" span={5} header="Last Name">
          {(data: DataType) => data.last_name}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');
    const tableRows = table.querySelectorAll('.list-item');

    expect(tableRows[0].querySelector('svg')).toHaveStyle(`
      color: rgba(0, 0, 0, 0.2);
    `);
    expect(tableRows[1].querySelector('svg')).toHaveStyle(`
      color: rgba(0, 0, 0, 0.2);
    `);
  });

  it('Should render a reponsive flex table', () => {
    render(
      <div style={{ maxWidth: '100%', maxHeight: '500px', position: 'relative' }}>
        <FlexTable data={MOCK_DATA} responsive>
          <FlexTable.Column key="Id" span={1} header="Id">
            {(data: DataType) => data.id}
          </FlexTable.Column>
          <FlexTable.Column key="First Name" span={1} header="First Name">
            {(data: DataType) => data.first_name}
          </FlexTable.Column>
          <FlexTable.Column key="Last Name" span={1} header="Last Name">
            {(data: DataType) => data.last_name}
          </FlexTable.Column>
          <FlexTable.Column key="Email" span={2} header="Email">
            {(data: DataType) => data.email}
          </FlexTable.Column>
          <FlexTable.Column key="Gender" span={1} header="Gender">
            {(data: DataType) => data.gender}
          </FlexTable.Column>
          <FlexTable.Column key="Avatar" span={1} header="Avatar">
            {(data: DataType) => <img src={data.avatar} />}
          </FlexTable.Column>
          <FlexTable.Column key="Car Make" span={1} header="Car Make">
            {(data: DataType) => data['car make']}
          </FlexTable.Column>
          <FlexTable.Column key="Car Model" span={1} header="Model">
            {(data: DataType) => data['car model']}
          </FlexTable.Column>
          <FlexTable.Column key="Car Model Year" span={1} header="Year">
            {(data: DataType) => data['car model year']}
          </FlexTable.Column>
        </FlexTable>
      </div>,
    );

    const table = document.querySelector('ul');
    expect(table).toHaveStyle(`
      min-width: 900px;
    `);
  });

  it('Should render a flex table with rowStyle prop', () => {
    render(
      <FlexTable
        nested={{
          render: (data) => (
            <List>
              <ListItem avatar={<img src={data.avatar} />} key="Gender">
                {data.gender}
              </ListItem>
            </List>
          ),
          exapandable: (data) => data['car model year'] < 2007,
        }}
        data={MOCK_DATA.slice(0, 2)}
        rowStyle={() => ({ background: 'orange' })}
      >
        <FlexTable.Column key="Id" span={2} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
        <FlexTable.Column key="First Name" span={5} header="First Name">
          {(data: DataType) => data.first_name}
        </FlexTable.Column>
        <FlexTable.Column key="Last Name" span={5} header="Last Name">
          {(data: DataType) => data.last_name}
        </FlexTable.Column>
        <FlexTable.Column key="Email" span={10} header="Email">
          {(data: DataType) => data.email}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={2} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');

    const tableRows = table.querySelectorAll('.list-item');
    expect(tableRows[1]).toHaveStyle(`
        background: orange;
    `);
    expect(tableRows[2]).toHaveStyle(`
        background: orange;
    `);
  });

  it('Should render a loading flex table', () => {
    render(
      <FlexTable loading data={[]}>
        <FlexTable.Column key="Id" span={2} header="Id">
          {(data: DataType) => data.id}
        </FlexTable.Column>
        <FlexTable.Column key="First Name" span={5} header="First Name">
          {(data: DataType) => data.first_name}
        </FlexTable.Column>
        <FlexTable.Column key="Last Name" span={5} header="Last Name">
          {(data: DataType) => data.last_name}
        </FlexTable.Column>
      </FlexTable>,
    );

    const table = document.querySelector('ul');
    expect(table.querySelector('.skeleton')).toBeDefined();
  });

  it('Should render a flex table with pagination', () => {
    render(<WithPagination />);

    const table = document.querySelector('ul');
    expect(table.querySelectorAll('.list-item').length).toBe(11);

    let firstRow = table.querySelectorAll('.list-item')[1];
    expect(firstRow.querySelector('.sha-el-col').innerHTML).toBe('1');

    let lastRow = table.querySelectorAll('.list-item')[10];
    expect(lastRow.querySelector('.sha-el-col').innerHTML).toBe('10');

    const pagination = table.querySelectorAll('.sha-el-row')[11];

    const nextPage = pagination.querySelectorAll('button')[1];
    act(() => {
      fireEvent.click(nextPage);
    });

    firstRow = table.querySelectorAll('.list-item')[1];
    expect(firstRow.querySelector('.sha-el-col').innerHTML).toBe('11');

    lastRow = table.querySelectorAll('.list-item')[10];
    expect(lastRow.querySelector('.sha-el-col').innerHTML).toBe('20');

    const previousPage = pagination.querySelectorAll('button')[0];
    act(() => {
      fireEvent.click(previousPage);
    });

    firstRow = table.querySelectorAll('.list-item')[1];
    expect(firstRow.querySelector('.sha-el-col').innerHTML).toBe('1');

    lastRow = table.querySelectorAll('.list-item')[10];
    expect(lastRow.querySelector('.sha-el-col').innerHTML).toBe('10');
  });
});

import React from 'react';
import { Story, Meta } from '@storybook/react';

import { FlexTable } from '.';
import MOCK_DATA from './MOCK_DATA.json';
import { List, ListItem } from '../List';
import { Row, Col, Pagination } from '../..';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { Popover } from '../Popover';
import { Input } from '../Input';
import { IoMdFunnel } from 'react-icons/io';
import { MdClear } from 'react-icons/md';

export default {
  title: 'Display/Flex Table',
  component: FlexTable,
  subcomponents: { Column: FlexTable.Column },
  parameters: {
    layout: 'padded',
  },
} as Meta;

type DataType = typeof MOCK_DATA[0];

export const Default: Story = () => {
  return (
    <FlexTable data={MOCK_DATA.slice(0, 4)}>
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
      {/* <FlexTable.Column key="Avatar" span={2} header="Avatar">
        {(data: DataType) => <img src={data.avatar} />}
      </FlexTable.Column> */}
      <FlexTable.Column key="Car Make" span={3} header="Car Make">
        {(data: DataType) => data['car make']}
      </FlexTable.Column>
      <FlexTable.Column key="Car Model" span={3} header="Model">
        {(data: DataType) => data['car model']}
      </FlexTable.Column>
      <FlexTable.Column key="Car Model Year" span={2} header="Year">
        {(data: DataType) => data['car model year']}
      </FlexTable.Column>
    </FlexTable>
  );
};

export const NestedTable: Story = () => {
  return (
    <FlexTable
      nested={{
        render: (data) => (
          <List>
            <ListItem avatar={<img src={data.avatar} />} key="Gender">
              {data.gender}
            </ListItem>
          </List>
        ),
        exapandable: (data) => data['car model year'] > 2005,
      }}
      data={MOCK_DATA.slice(0, 4)}
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
    </FlexTable>
  );
};

export const ResponsiveTable: Story = () => {
  return (
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
        <FlexTable.Column key="Car Model Year" span={1} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={1} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={1} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={1} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
        <FlexTable.Column key="Car Model Year" span={1} header="Year">
          {(data: DataType) => data['car model year']}
        </FlexTable.Column>
      </FlexTable>
    </div>
  );
};

export const SortingAndFiltering: Story = () => {
  const [data, updateData] = React.useState(MOCK_DATA.slice(0, 4));
  const [sort, updateSort] = React.useState<'+' | '-' | null>(null);

  return (
    <FlexTable data={data} responsive>
      <FlexTable.Column key="Id" span={3} header="Id">
        {(data: DataType) => data.id}
      </FlexTable.Column>
      <FlexTable.Column key="First Name" span={5} header="First Name">
        {(data: DataType) => data.first_name}
      </FlexTable.Column>
      <FlexTable.Column
        header={
          <Popover
            overlay={
              <Input
                borderless
                placeholder="Press Enter to Apply"
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  updateData(data.filter((val) => val.last_name.includes((e.target as HTMLInputElement).value)))
                }
                after={<MdClear style={{ cursor: 'pointer' }} onClick={() => updateData(MOCK_DATA.slice(0, 4))} />}
              />
            }
          >
            <span>
              Last Name <IoMdFunnel style={{ display: 'inline-flex' }} />
            </span>
          </Popover>
        }
        key="Last Name"
        span={5}
      >
        {(data: DataType) => data.last_name}
      </FlexTable.Column>
      <FlexTable.Column key="Email" span={8} header="Email">
        {(data: DataType) => data.email}
      </FlexTable.Column>
      <FlexTable.Column
        key="Car Model Year"
        span={3}
        header={
          <Row alignItems="center">
            <Col flex="1 0 auto">Year</Col>
            <Col flex="0 1 auto">
              {['+', null].includes(sort) && (
                <AiOutlineSortAscending
                  color={sort === '+' && '#f0f'}
                  onClick={() => {
                    updateSort(sort === '+' ? '-' : '+');
                    updateData(data.sort((a, b) => a['car model year'] - b['car model year']));
                  }}
                />
              )}
              {sort === '-' && (
                <AiOutlineSortDescending
                  color="#f0f"
                  onClick={() => {
                    updateSort(null);
                    updateData(data.sort((a, b) => b['car model year'] - a['car model year']));
                  }}
                />
              )}
            </Col>
          </Row>
        }
      >
        {(data: DataType) => data['car model year']}
      </FlexTable.Column>
    </FlexTable>
  );
};

export const CustomStyling: Story = () => {
  return (
    <FlexTable
      data={MOCK_DATA.slice(0, 4)}
      style={{
        header: {
          backgroundColor: 'rgb(245, 248, 239)',
          color: '#989737',
        },
      }}
    >
      <FlexTable.Column key="Id" span={1} header="Id">
        {(data: DataType) => data.id}
      </FlexTable.Column>
      <FlexTable.Column key="First Name" span={3} header="First Name">
        {(data: DataType) => data.first_name}
      </FlexTable.Column>
      <FlexTable.Column key="Last Name" span={4} header="Last Name">
        {(data: DataType) => data.last_name}
      </FlexTable.Column>
      <FlexTable.Column key="Email" span={6} header="Email">
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
      <FlexTable.Column
        style={{ background: '#F5F8EF', color: '#989737', borderColor: '#F5F8EF' }}
        key="Car Model Year"
        span={2}
        header="Year"
      >
        {(data: DataType) => data['car model year']}
      </FlexTable.Column>
    </FlexTable>
  );
};

export const EmptyState: Story = () => {
  return (
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
    </FlexTable>
  );
};

export const LoadingState: Story = () => {
  return (
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
      <FlexTable.Column key="Email" span={8} header="Email">
        {(data: DataType) => data.email}
      </FlexTable.Column>
      <FlexTable.Column key="Car Model Year" span={4} header="Year">
        {(data: DataType) => data['car model year']}
      </FlexTable.Column>
    </FlexTable>
  );
};

export const WithPagination: Story = () => {
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

import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Table } from '.';
import { Row, Col, MenuItem, Tooltip, Pagination, Menu } from '../..';
import { MdSort, MdSortByAlpha } from 'react-icons/md';
import { TableProps } from './Table';

export default {
  title: 'Display/Table',
  component: Table,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const BasicTableWithHeadersAndFooters: Story<TableProps<{ name: string; age: string; status: string }>> = (
  args,
) => (
  <Table
    {...args}
    columns={[
      {
        header: 'name',
        key: 'name',
        dataIndex: 'name',
        render: (text, obj) => (
          <>
            <div>{text}</div>
            <div>{obj.status}</div>
          </>
        ),
      },
      {
        header: 'age',
        key: 'age',
        dataIndex: 'age',
      },
    ]}
    header={
      <Row justifyContent="flex-end" gutter={[0, 0]}>
        <Col flex="1 0 auto">Profile Table</Col>
        <Col flex="0 1 auto">
          <Menu anchor={<MdSort />} position="bottom">
            <MenuItem key={'List'}>{'List'}</MenuItem>
          </Menu>
        </Col>
        <Col flex="0 1 auto">
          <Tooltip overlay="Sorting Order" trigger={['hover']}>
            <div>
              <Menu anchor={<MdSortByAlpha />} position="bottom">
                <MenuItem>Ascending</MenuItem>
                <MenuItem>Descening</MenuItem>
              </Menu>
            </div>
          </Tooltip>
        </Col>
      </Row>
    }
    footer={<Pagination batchSize={20} totalCount={19} currentPage={1} />}
  />
);

BasicTableWithHeadersAndFooters.args = {
  data: [
    {
      name: 'Name 1',
      age: '22',
      status: 'abc',
    },
  ],
};

export const EmptyState = BasicTableWithHeadersAndFooters.bind({});
EmptyState.args = {
  data: [],
};

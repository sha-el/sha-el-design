import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Table } from '.';
import { Row, Col, MenuItemGroup, MenuItem, Tooltip, Pagination } from '../..';
import { MdSort, MdSortByAlpha } from 'react-icons/md';

const stories = storiesOf('Table', module);

stories.add(
  'Basic table with headers and footers',
  withInfo({ inline: true })(() => {
    return (
      <Table
        data={[{
          name: 'Name 1',
          age: '22',
          status: 'abc',
        }]}
        columns={[{
          header: 'name',
          key: 'name',
          dataIndex: 'name',
          render: (text, obj) => (
            <>
              <div>{text}</div>
              <div>{obj.status}</div>
            </>
          ),
        }, {
          header: 'age',
          key: 'age',
          dataIndex: 'age',
        }]}
        header={
          <Row justifyContent='flex-end' gutter={['0', '0']}>
            <Col flex='1 0 auto'>
              Profile Table
            </Col>
            <Col flex='0 1 auto'>
              <MenuItemGroup
                title=''
                icon={<MdSort />}
                inline={false}
                position='bottom'
              >
                <MenuItem name={'List'} key={'List'}>{'List'}</MenuItem>
              </MenuItemGroup>
            </Col>
            <Col flex='0 1 auto'>
              <Tooltip
                overlay='Sorting Order'
                trigger={['hover']}
              >
                <div>
                  <MenuItemGroup
                    title=''
                    icon={<MdSortByAlpha />}
                    inline={false}
                    position='bottom'
                  >
                    <MenuItem name='asc'>Ascending</MenuItem>
                    <MenuItem name='desc'>Descening</MenuItem>
                  </MenuItemGroup>
                </div>
              </Tooltip>
            </Col>
          </Row>}
        footer={
          <Pagination
            batchSize={20}
            totalCount={19}
            currentPage={1}
            showTotal
          />
        }
      />
    );
  }),
);
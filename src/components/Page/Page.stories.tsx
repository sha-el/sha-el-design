import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import {
  Page, Row, Col, Tag, TabPanel, MenuItemGroup,
  MenuItem, Table, Pagination, Card, Collapse, Tooltip, Button,
} from '../../';

import { Textarea, Input } from '../Input';

import { MdArrowBack, MdSearch, MdSort, MdSortByAlpha } from 'react-icons/md';
import { Breadcrumb } from '../Breadcrumb';

const stories = storiesOf('Page', module);

stories.add(
  'Page',
  withInfo()(() => (
    <Page
      title={
        <Breadcrumb
          paths={[
            () => <a key='hello'>Hello world</a>,
            () => <a key='user-list'>User List</a>,
          ]}
        />
      }
      backIcon={<MdArrowBack />}
      extra={
        <Row gutter={[0, 0]}>
          <Col flex='1 0 auto'>
            <Input
              label='Search'
              borderLess
              after={<MdSearch style={{ cursor: 'pointer' }} />}
            />
          </Col>
        </Row>
      }
      tags={[
        <Tag key='user' color='#3CD4A0'>Sent</Tag>,
        <Tag key='list' color='#f60'>List</Tag>,
      ]}
      tabs={{
        defaultActiveKey: 'a',
        headers: [{ title: 'Hello', key: 'a' }, { title: 'Yolo', key: 'b' }, { title: 'YOLO', key: 'c' }],
        panels: ([
          <TabPanel key='a' title='Hello'>
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
          </TabPanel>,
          <TabPanel key='b' title='YOLO najdaijdawo'>
            Yolo
          </TabPanel>,
          <TabPanel key='c' title='YOLO'>
            Yolo
          </TabPanel>,
          <TabPanel key='d' title='YOLO'>
            Yolo
          </TabPanel>,
          <TabPanel key='end' title='YOLO'>
            Yolo
          </TabPanel>,
        ]),
      }}
    >
      <Card>
        <Col span={12}>
          <Textarea hint='ola' error='ola' before={<MdArrowBack />} after={<MdSearch />} />
        </Col>
        <Collapse header='HEllo?' isOpen={true}>
          <Row>
            <Col span={12}>HELLO</Col>
            <Col span={12}>ola</Col>
          </Row>
        </Collapse>
        <Collapse header='HEllo?' >
          <Row>
            <Col span={12}>HELLO</Col>
          </Row>
        </Collapse>
        <Collapse header='HEllo?' >
          <Row>
            <Col span={12}>HELLO</Col>
          </Row>
        </Collapse>
      </Card>
    </Page>
  )),
);

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import {
  Page, Row, Col, Input, Tag, Button, Tabs, TabPanel, Popover, MenuItemGroup,
  MenuItem, Table, Pagination, Card, TextArea, Collapse,
} from '../../index';

import { MdArrowBack, MdSearch, MdArrowForward, MdAdd, MdFilter, MdFileDownload } from 'react-icons/md';
import { Breadcrumb } from '../Breadcrumb';

const stories = storiesOf('Page', module);

stories.add(
  'Page',
  withInfo({ inline: true })(() => (
    <Page
      title={
        <Breadcrumb
          paths={[
            () => <a key='hello'>Hello</a>,
            () => <a key='user-list'>User List</a>,
          ]}
        />
      }
      backIcon={<MdArrowBack />}
      extra={
        <Input
          label='Search'
          after={<MdSearch style={{ cursor: 'pointer' }} />}
        />
      }
      tags={[
        <Tag key='user' color='#3CD4A0'>Sent</Tag>,
        <Tag key='list' color='#f60'>List</Tag>,
      ]}
      bottom={
        <Row alignItems='flex-end' justifyContent='flex-end'>
          <Col flex='0 1 auto'>
            <Button flat icon={<MdFilter />} >FIlter</Button>
          </Col>
          <Col flex='0 1 auto'>
            <Button flat icon={<MdFileDownload />} >Download CSV</Button>
          </Col>
          <Col flex='0 1 auto'>
            <Button type='secondary' icon={<MdAdd />} >Add User</Button>
          </Col>
        </Row>
      }
      tabs={{
        defaultActiveKey: 'a',
        headers: [{ title: 'Hello', key: 'a' }, { title: 'Yolo', key: 'b' }, { title: 'YOLO', key: 'c' }],
        panels: ([
          <TabPanel key='a' title='Hello'>
            <Table
              data={[]}
              columns={[{
                header: 'name',
                key: 'name',
                dataIndex: 'name',
              }, {
                header: 'age',
                key: 'age',
                dataIndex: 'age',
              }]}
              header={
                <h6>User List</h6>
              }
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
    // tabs={
    //   <Tabs defaultActiveKey='a'>
    // <TabPanel name='a' title='Hello'>
    //   <Popover
    //     position='right'
    //     content={
    //       <MenuItemGroup inline={false} title='Ola'>
    //         <MenuItem icon={<MdArrowForward />} name='a'>Hello</MenuItem>
    //       </MenuItemGroup>}
    //   >
    //     <Button>Submit</Button>
    //   </Popover>
    //   <Button size='big'>Submit</Button>
    //   <Table
    //     data={[]}
    //     columns={[{
    //       header: 'name',
    //       key: 'name',
    //       dataIndex: 'name',
    //     }, {
    //       header: 'age',
    //       key: 'age',
    //       dataIndex: 'age',
    //     }]}
    //   />
    //   <Pagination
    //     batchSize={20}
    //     totalCount={19}
    //     currentPage={1}
    //     showTotal
    //   />
    // </TabPanel>
    // <TabPanel name='b' title='YOLO najdaijdawo'>
    //   Yolo
    // </TabPanel>
    // <TabPanel name='c' title='YOLO'>
    //   Yolo
    // </TabPanel>
    // <TabPanel name='d' title='YOLO'>
    //   Yolo
    // </TabPanel>
    // <TabPanel name='end' title='YOLO'>
    //   Yolo
    // </TabPanel>
    //   </Tabs>
    // }
    >
      <Card>
        <Col span={12}>
          <TextArea hint='ola' error='ola' before={<MdArrowBack />} after={<MdSearch />} />
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

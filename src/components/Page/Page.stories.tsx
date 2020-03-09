import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Page, Row, Col, Input, Tag, Button, Tabs, TabPanel, Popover, MenuItemGroup,
  MenuItem, Table, Pagination, Card, TextArea, Collapse } from '../../index';

import { MdArrowBack, MdSearch, MdArrowForward } from 'react-icons/md';

const stories = storiesOf('Page', module);

stories.add(
  'Page',
  withInfo({ inline: true })(() => (
    <Page
      title='User List'
      subtitle='List of all Users'
      breadcrumbs={{
        paths: [
          { render: () => <a key='hello'>Hello</a> },
          { render: () => <a key='user-list'>User List</a> },
        ],
        seperator: '>',
      }}
      backIcon={<MdArrowBack />}
      extra={
        <Row alignItems='self-end'>
          <Col offset={12} span={12} spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
            <Input
              label='Search'
              after={<MdSearch style={{ cursor: 'pointer' }} />}
            />
          </Col>
        </Row>
      }
      tags={[
        <Tag key='user' color='#3ac47d'>User</Tag>,
        <Tag key='list' color='#f60'>List</Tag>,
      ]}
      bottom={
        <div
          style={{
            position: 'absolute',
            right: '5px',
            top: '130px',
            zIndex: 2,
          }}
        >
          <Row>
            <Col span={8}>
              <Button type='secondary' shape='circle' size='big' icon={<MdSearch />} />
            </Col>
          </Row>
        </div>
      }
      tabs={
        <Tabs defaultActiveKey='a'>
          <TabPanel name='a' title='Hello'>
            <Popover
              position='right'
              content={
                <MenuItemGroup inline={false} title='Ola'>
                  <MenuItem icon={<MdArrowForward />} name='a'>Hello</MenuItem>
                </MenuItemGroup>}
            >
              <Button>Submit</Button>
            </Popover>
            <Button size='big'>Submit</Button>
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
            />
            <Pagination
              batchSize={20}
              totalCount={19}
              currentPage={1}
              showTotal
            />
          </TabPanel>
          <TabPanel name='b' title='YOLO najdaijdawo'>
            Yolo
          </TabPanel>
          <TabPanel name='c' title='YOLO'>
            Yolo
          </TabPanel>
          <TabPanel name='d' title='YOLO'>
            Yolo
          </TabPanel>
          <TabPanel name='end' title='YOLO'>
            Yolo
          </TabPanel>
        </Tabs>
      }
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

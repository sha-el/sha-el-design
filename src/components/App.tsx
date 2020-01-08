import * as React from 'react';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { Page } from './Page/Page';
import { MdArrowBack, MdSearch } from 'react-icons/md';
import { Tag } from './Tag';
import { AutoCompleteAsync } from './AutoComplete';
import { Input } from './Input';
import { Card, Button, Col, Row } from '..';
import { Table } from './Table';
import { FaMedal, Fa500Px, FaAccessibleIcon } from 'react-icons/fa';
import { Tabs, TabPanel } from './Tabs';

export class App extends React.Component {

  response = [{
    id: '1',
    name: 'abc',
  }, {
    id: '2',
    name: 'xyz',
  }, {
    id: '3',
    name: 'xyz',
  }];

  state = {
    value: null,
    name: '',
    response: this.response,
  };

  onNameChange = (name: string) => {
    const response = this.response.filter(v => v.name.includes(name));
    this.setState({ name, response });
  }

  render() {
    return (
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
            <Col offset={12} span={12}>
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
                <Button type='secondary' shape='circle'>
                  <MdSearch />
                </Button>
              </Col>
              <Col span={8}>
                <Button type='info' shape='circle'>
                  <MdSearch />
                </Button>
              </Col>
              <Col span={8}>
                <Button type='error' shape='circle'>
                  <MdSearch />
                </Button>
              </Col>
            </Row>
          </div>
        }
        tabs={
          <Tabs defaultActiveKey='a'>
            <TabPanel name='a' title='Hello'>
              <Table
                data={[{ name: 'name', age: 'age' }]}
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
            <TabPanel name='f60' title='YOLO'>
              Yolo
            </TabPanel>
            <TabPanel name='g' title='YOLO'>
              Yolo
            </TabPanel>
            <TabPanel name='header' title='YOLO'>
              Yolo
            </TabPanel>
            <TabPanel name='icons' title='YOLO'>
              Yolo
            </TabPanel>
            <TabPanel name='j' title='YOLO'>
              Yolo
            </TabPanel>
          </Tabs>
        }
      />
    );
  }
}

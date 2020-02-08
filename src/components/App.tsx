import * as React from 'react';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { Page } from './Page/Page';
import { MdArrowBack, MdSearch, MdArrowForward } from 'react-icons/md';
import { Tag } from './Tag';
import { AutoCompleteAsync } from './AutoComplete';
import { Input, TextArea } from './Input';
import { Card, Button, Col, Row, Container } from '..';
import { Table } from './Table';
import { FaMedal, Fa500Px, FaAccessibleIcon } from 'react-icons/fa';
import { Tabs, TabPanel } from './Tabs';
import { MenuItem, MenuItemGroup } from './Menu';
import { SidePanel, Content } from './Layout';
import { Link, BrowserRouter } from 'react-router-dom';
import { Collapse } from './Collapse';
import { Pagination } from './Pagination';

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
      <BrowserRouter>
        <Container>
          <SidePanel
            bottom={
              <div>
                <MenuItem name='hello' icon={<MdArrowBack />}>
                  hello
              </MenuItem>
                <MenuItem name='x' icon={<MdArrowBack />}>
                  hello
              </MenuItem>
                <MenuItemGroup title='Ola'>
                  <MenuItem icon={<MdArrowForward />} name='a'>Hello</MenuItem>
                </MenuItemGroup>
              </div>
            }
          >
            <Link to='/a'>
              <MenuItem active name='hello' icon={<MdArrowBack />}>
                hello
              </MenuItem>
            </Link>
            <Link to='/a'>
              <MenuItem name='x' icon={<MdArrowBack />}>
                hello
              </MenuItem>
            </Link>
            <MenuItem name='x' icon={<MdArrowBack />}>
              hello
            </MenuItem>
            <MenuItemGroup title='Ola'>
              <MenuItem icon={<MdArrowForward />} name='a'>Hello</MenuItem>
            </MenuItemGroup>
          </SidePanel>
          <Content>
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
                      <Button type='secondary' shape='circle' size='big'>
                        <MdSearch />
                      </Button>
                    </Col>
                    <Col span={8}>
                      <Button type='info' shape='circle' size='fat'>
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
                    <Button size='fat'>Submit</Button>
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
                <Collapse header='HEllo?' isOpen={!!this.state.value} onChange={(e) => this.setState({ value: e })}>
                  <Row>
                    <Col span={12}>HELLO</Col>
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
          </Content>
        </Container>
      </BrowserRouter>
    );
  }
}

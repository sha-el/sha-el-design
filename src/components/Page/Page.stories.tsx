import React from 'react';
import { Meta } from '@storybook/react';

import { Page, Row, Col, Tag, TabPanel, Card, Collapse, AutoComplete } from '../../';

import { Textarea, Input } from '../Input';

import { MdAdd, MdArrowBack, MdHome, MdSearch } from 'react-icons/md';
import { Breadcrumb } from '../Breadcrumb';
import { FlexTable } from '../FlexTable';
import MOCK_DATA from '../FlexTable/MOCK_DATA.json';
import { Button } from '../Button';

type DataType = typeof MOCK_DATA[0];

export default {
  title: 'Layout/Page',
  component: Page,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic = () => (
  <Page
    title={
      <Breadcrumb>
        <a key="hello">
          <MdHome />
        </a>
        <a key="user-list">User List</a>
      </Breadcrumb>
    }
    backIcon={<MdArrowBack />}
    extra={
      <Row>
        <Col flex="1 0 auto">
          <Input label="Search" borderless after={<MdSearch style={{ cursor: 'pointer' }} />} />
        </Col>
      </Row>
    }
    tags={[
      <Tag key="user" color="#3CD4A0">
        Sent
      </Tag>,
      <Tag key="list" color="#f60">
        List
      </Tag>,
    ]}
    bottom={
      <Button type="primary" outline icon={<MdAdd />}>
        Add
      </Button>
    }
    tabs={{
      defaultActiveKey: 'a',
      headers: [
        { title: 'Hello', key: 'a' },
        { title: 'Yolo', key: 'b' },
        { title: 'YOLO', key: 'c' },
      ],
      panels: [
        <TabPanel key="a" title="Hello">
          <FlexTable data={MOCK_DATA.slice(0, 4)} responsive>
            <FlexTable.Column key="Id" span={4} header="Id">
              {(data: DataType) => data.id}
            </FlexTable.Column>
            <FlexTable.Column key="First Name" span={4} header="First Name">
              {(data: DataType) => data.first_name}
            </FlexTable.Column>
            <FlexTable.Column key="Last Name" span={4} header="Last Name">
              {(data: DataType) => data.last_name}
            </FlexTable.Column>
            <FlexTable.Column key="Email" span={8} header="Email">
              {(data: DataType) => data.email}
            </FlexTable.Column>
            <FlexTable.Column key="Gender" span={4} header="Gender">
              {(data: DataType) => data.gender}
            </FlexTable.Column>
          </FlexTable>
        </TabPanel>,
        <TabPanel key="b" title="YOLO najdaijdawo">
          Yolo
        </TabPanel>,
        <TabPanel key="c" title="YOLO">
          <Row>
            <Col span={8}>
              <AutoComplete
                mode="single"
                data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
                uniqueIdentifier={(e) => e}
                listDisplayProp={(e) => e}
                label="Select Alter Ego"
                displayValue={(e) => e as string}
                hint="Select an alter ego"
              />
            </Col>
            <Col span={8}>
              <AutoComplete
                mode="single"
                data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
                uniqueIdentifier={(e) => e}
                listDisplayProp={(e) => e}
                label="Select Alter Ego"
                displayValue={(e) => e as string}
                hint="Select an alter ego"
              />
            </Col>
          </Row>
        </TabPanel>,
        <TabPanel key="d" title="YOLO">
          Yolo
        </TabPanel>,
        <TabPanel key="end" title="YOLO">
          Yolo
        </TabPanel>,
      ],
    }}
  >
    <Card>
      <Col span={12}>
        <Textarea hint="ola" error="ola" before={<MdArrowBack />} after={<MdSearch />} />
      </Col>
      <Collapse header="HEllo?" isOpen={true}>
        <Row>
          <Col span={12}>HELLO</Col>
          <Col span={12}>ola</Col>
        </Row>
      </Collapse>
      <Collapse header="HEllo?">
        <Row>
          <Col span={12}>HELLO</Col>
        </Row>
      </Collapse>
      <Collapse header="HEllo?">
        <Row>
          <Col span={12}>HELLO</Col>
        </Row>
      </Collapse>
      <AutoComplete
        mode="single"
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label="Select Alter Ego"
        displayValue={(e) => e as string}
        hint="Select an alter ego"
      />
      <AutoComplete
        mode="single"
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label="Select Alter Ego"
        displayValue={(e) => e as string}
        hint="Select an alter ego"
      />
      <AutoComplete
        mode="single"
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label="Select Alter Ego"
        displayValue={(e) => e as string}
        hint="Select an alter ego"
      />
      <AutoComplete
        mode="single"
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label="Select Alter Ego"
        displayValue={(e) => e as string}
        hint="Select an alter ego"
      />
      <AutoComplete
        mode="single"
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label="Select Alter Ego"
        displayValue={(e) => e as string}
        hint="Select an alter ego"
      />
    </Card>
  </Page>
);

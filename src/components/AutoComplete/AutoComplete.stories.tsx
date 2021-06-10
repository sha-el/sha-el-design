import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AutoComplete } from './index';
// import { Col, Row } from '../Grid';
import { SingleAutoComplete, MultiAutoComplete } from './AutoComplete';
import { Row, Col } from '../..';
import { Button } from '../Button';
import { MdExpandMore } from 'react-icons/md';

export default {
  title: 'Inputs/AutoComplete',
  component: AutoComplete,
} as Meta;

export const Single: Story<SingleAutoComplete<string>> = () => {
  const [value, update] = React.useState('Clark');

  return (
    <AutoComplete
      mode="single"
      data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
      uniqueIdentifier={(e) => e}
      listDisplayProp={(e) => e}
      label="Select Alter Ego"
      value={value}
      displayValue={(e) => e as string}
      onChange={(e: string) => update(e)}
      hint="Select an alter ego"
      searchValue={(e) => e}
    />
  );
};

export const Multiple: Story<MultiAutoComplete<string>> = () => {
  const [value, update] = React.useState(['Clark', 'Arthur']);

  return (
    <AutoComplete<string>
      mode="multiple"
      data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
      uniqueIdentifier={(e) => e}
      listDisplayProp={(e) => e}
      label="Select Alter Ego"
      value={value}
      displayValue={(e) => e as string}
      onChange={(e: string[]) => update(e)}
      searchValue={(e) => e}
    />
  );
};

export const AsyncFetch: Story = () => {
  const [value, update] = React.useState({
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    id: 1,
    last_name: 'Bluth',
  });

  return (
    <AutoComplete<typeof value>
      value={value}
      data={() =>
        fetch('https://reqres.in/api/users')
          .then((r) => r.json())
          .then((r) => r.data)
      }
      uniqueIdentifier={(e) => String(e.id)}
      listDisplayProp={(e) => (
        <Row gutter={[0, 50]}>
          <Col flex="0 1 50px">
            <img width="100%" src={e.avatar} />
          </Col>
          <Col alignSelf="center" flex="1 0 calc(50% - 100px)">
            {e.first_name} {e.last_name}
          </Col>
        </Row>
      )}
      label="Select User"
      onChange={(e) => update(e)}
      displayValue={(e) => e && e.first_name}
      searchValue={(e) => e.first_name}
    />
  );
};

export const CustomAnchorElement: Story<SingleAutoComplete<string>> = () => {
  const [value, update] = React.useState('Clark');

  return (
    <AutoComplete
      mode="single"
      data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
      uniqueIdentifier={(e) => e}
      listDisplayProp={(e) => e}
      label="Select Alter Ego"
      value={value}
      displayValue={(e) => e as string}
      onChange={(e: string) => update(e)}
    >
      <Button type="primary" displayBlock outline>
        {value} <MdExpandMore />
      </Button>
    </AutoComplete>
  );
};

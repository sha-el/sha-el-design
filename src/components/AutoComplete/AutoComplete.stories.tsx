import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { AutoComplete } from './index';
import { Col, Row } from '../Grid';

const stories = storiesOf('AutoComplete', module);

stories.add(
  'AutoComplete with single mode',
  withInfo({ inline: true })(() => {
    const [value, update] = React.useState('Clark');
    return (
      <AutoComplete
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label='Select Alter Ego'
        value={value}
        onChange={(e: string) => update(e)}
        displayValue={(e) => e}
      />
    );
  }),
);

stories.add(
  'AutoComplete with multiple mode',
  withInfo({ inline: true })(() => {
    const [value, update] = React.useState(['Clark', 'Bruce']);
    return (
      <AutoComplete<string>
        mode='multiple'
        value={value}
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
        uniqueIdentifier={(e) => e}
        listDisplayProp={(e) => e}
        label='Select Alter Ego'
        onChange={(e: string[]) => update(e)}
        displayValue={(e) => e}
        required={true}
      />
    );
  }),
);

stories.add(
  'AutoComplete with async fetch',
  withInfo({ inline: true })(() => {
    const [value, update] = React.useState({
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      id: 1,
      last_name: 'Bluth',
    });
    return (
      <AutoComplete<any>
        value={value}
        data={() =>
          fetch('https://reqres.in/api/users')
            .then(r => r.json())
            .then(r => r.data)
        }
        uniqueIdentifier={(e) => e.id}
        listDisplayProp={(e) => (
          <Row gutter={[0, 0]}>
            <Col flex='0 1 50px'><img width='100%' src={e.avatar} /></Col>
            <Col alignSelf='center' flex='1 0 calc(50% - 100px)'>
              {e.first_name} {e.last_name}
            </Col>
          </Row>
        )}
        label='Select User'
        onChange={(e) => update(e)}
        displayValue={(e) => e && e.first_name}
        searchValue={(e) => e.first_name}
      />
    );
  }),
);

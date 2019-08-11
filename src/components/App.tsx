import * as React from 'react';
import { Table } from './Table/Table';
import { Card } from './Card/Card';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <Card
        title='Hello'
        subtitle='Ola'
      >
        <Table
          data={[{a: 'a', b: 'b'}, {a: 'a', b: 'b'}]}
          columns={[{
            header: 'a',
            key: 'a',
            render: () => 'a',
          }, {
            header: 'b',
            key: 'b',
            render: () => 'b',
          }]}
        />
      </Card>
    );
  }
}

import * as React from 'react';
import { Card } from './Card';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Card
          title='OLA'
          footer='Bye'
        >
          hello
        </Card>
      </div>
    );
  }
}

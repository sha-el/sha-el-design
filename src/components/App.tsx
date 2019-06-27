import * as React from 'react';
import { Divider } from './Divider/Divider';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div>
        <Divider />
      </div>
    );
  }
}

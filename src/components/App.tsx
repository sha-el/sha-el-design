import * as React from 'react';
import { Loading } from './Loading';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div>
        <Loading isLoading={true} />
      </div>
    );
  }
}

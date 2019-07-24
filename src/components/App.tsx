import * as React from 'react';
import { CheckBox } from './CheckBox';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div>
        <CheckBox label='hello' checked={this.state.value} onChange={(e) => this.setState({ value: e.target.checked })} />
      </div>
    );
  }
}

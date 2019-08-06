import * as React from 'react';
import { Tag } from './Tag/Tag';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div>
        <Tag active={this.state.value} onClose={(value) => this.setState({ value })} color='#0f0'>HEllo</Tag>
        <Tag color='#f60'>OLA</Tag>
      </div>
    );
  }
}

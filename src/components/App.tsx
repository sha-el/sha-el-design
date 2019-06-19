import * as React from 'react';
import { Collapse } from './Collapse/Collapse';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 3 }];

  state = {
    value: true,
  };

  onChange = (e, f) => {
    this.setState({ value: e });
  }

  onNameChange = (e) => {
    this.setState({
      data: this.data.filter(v => v.name.includes(e)),
    });
  }

  render() {

    return (
      <div>
        <Collapse
          isOpen={this.state.value}
          header='Hello'
          onChange={(value) => this.setState({ value })}
        >
          haudhf
          nefnsf
          fnsfnslk
          senflksfns
          ksnflsn
          nslnskl
          nesflkns
        </Collapse>
      </div>
    );
  }
}

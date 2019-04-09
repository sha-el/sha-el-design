import * as React from 'react';
import { initialize } from '../helpers';
import { AutoComplete } from './AutoComplete';
import { Button } from './Button';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 2 }];

  state = {
    value: '',
    data: this.data,
  };

  onChange = (e) => {
    this.setState({ value: e });
  }

  render() {
    initialize();

    return (
      <div>
        <AutoComplete
          data={['MALE', 'FEMALE', 'OTHER'].map(v => ({ id: v, name: v }))}
          value={this.state.value}
          uniqueIdentifier={e => e.id}
          displayProp={e => e && e.name}
          onChange={(e) => this.onChange(e)}
          inputProps={{ label: 'Gender' }}
        />
        <Button onClick={() => this.setState({ value: 'MALE' })} >CLICK</Button>
      </div>
    );
  }
}

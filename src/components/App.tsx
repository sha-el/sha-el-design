import * as React from 'react';
import { AutoComplete } from './AutoComplete';
import { Table } from './Table';
import { initialize } from '../helpers';
import { Input } from './Input';

export class App extends React.Component {

  data = ['FULL_TIME', 'INTERN', 'CONSULTANT'].map(v => ({ name: v, id: v }));

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
          uniqueIdentifier={(v) => v.id}
          displayProp={(v) => v && v.name}
          data={this.data}
          filterFunction={() => true}
          renderOptions={this.state.data.map((value, index) => (
            <div key={`${index}-design-drop`}>
              {value.name} ll
            </div>
          ))}
          onChange={(v) => this.onChange(v)}
          value={this.state.value}
          onSearch={(e) => this.setState({data: this.data.filter(v => v.name.includes(e.target.value))})}
        />
      </div>
    );
  }
}

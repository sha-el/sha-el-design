import * as React from 'react';
import { initialize } from '../helpers';
import { AutoComplete } from './AutoComplete';
import { Button } from './Button';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 2 }];

  state = {
    value: 2,
    data: this.data,
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
    initialize();

    return (
      <div>
        <AutoComplete
          data={this.state.data}
          value={this.state.value}
          filterFunction={() => true}
          renderOptions={this.data.map((value, index) => (
            <div key={`${index}-design-drop`}>
              {value.name}
            </div>
          ))}
          onSearch={(e) => this.onNameChange(e.target.value)}
          displayProp={(v) => v && v.name || ''}
          uniqueIdentifier={(v) => v.id}
          onChange={(value, f) => this.setState({ value })}
          allowClear
        />
        <Button
          onClick={() => this.setState({ value: 1 })}
        />
      </div>
    );
  }
}

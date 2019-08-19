import * as React from 'react';
import { Input, Row, Col, Radio, Button } from '../';
import { RadioGroup, RadioButton } from '../';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { AutoComplete } from './AutoComplete';

export class App extends React.Component {

  response = [{
    id: '1',
    name: 'abc',
  }, {
    id: '2',
    name: 'xyz',
  }, {
    id: '3',
    name: 'xyz',
  }];

  state = {
    value: '1',
    name: '',
    response: this.response,
  };

  onNameChange = (name: string) => {
    const response = this.response.filter(v => v.name.includes(name));
    this.setState({ name, response });
  }

  render() {
    return (
      <AutoComplete
        value={this.state.value || ''}
        data={this.state.response}
        filterFunction={() => true}
        renderOptions={this.state.response.map((value, index) => (
          <div key={`${index}-design-drop`}>
            {value.name}
          </div>
        ))}
        uniqueIdentifier={(v: any) => v.id}
        displayProp={(v: any) => v.name}
        onSearch={(e) => this.onNameChange(e.target.value)}
      />
    );
  }
}

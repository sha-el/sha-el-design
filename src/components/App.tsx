import * as React from 'react';
import { AutoComplete } from './AutoComplete';
import { Table } from './Table';
import { initialize } from '../helpers';
import { Input } from './Input';

export class App extends React.Component {

  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({ value: e });
  }

  render() {
    initialize();

    return (
      <div>
        <AutoComplete
          data={['FULL_TIME', 'INTERN', 'CONSULTANT'].map(v => ({ name: v, id: v }))}
          value={this.state.value}
          uniqueIdentifier='id'
          displayProp='name'
          inputProps={{ label: 'Employment Type' }}
          onChange={(v) => this.onChange(v)}
        />
        <Table
          data={[{ name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' },
          { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' },
          { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' },
          { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' },
          { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }]}
          columns={[{
            dataIndex: 'name',
            key: 'name',
            header: 'name',
          }]}
        />
      </div>
    );
  }
}

import * as React from 'react';
import { initialize } from '../helpers';
import { AutoComplete } from './AutoComplete';
import { Button } from './Button';
import { Progress } from './Progress';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 2 }];

  state = {
    value: 50,
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
          data={['FULL_TIME', 'INTERN', 'CONSULTANT'].map(v => ({ name: v, id: v }))}
          value={'3'}
          uniqueIdentifier={(v) => v.id}
          displayProp={(v) => v && v.name}
          inputProps={{ label: 'Employment Type' }}
          onChange={(v) => this.onChange('employmentType')}
        />
      </div>
    );
  }
}

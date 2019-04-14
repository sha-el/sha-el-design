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
        <Progress
          percent={this.state.value}
          text='30/100'
          status='error'
        />
        <Button onClick={() => this.setState({ value: 100 })} />
      </div>
    );
  }
}

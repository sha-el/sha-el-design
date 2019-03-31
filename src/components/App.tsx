import * as React from 'react';
import { initialize } from '../helpers';
import { Calendar } from './Calendar';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 2 }];

  state = {
    value: true,
    data: this.data,
  };

  onChange = (e) => {
    this.setState({ value: e });
  }

  render() {
    initialize();

    return (
      <div>
        <Calendar
          date={[2019, 0, 1]}
        />
      </div>
    );
  }
}

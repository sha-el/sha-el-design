import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Table } from './Table';
import { Button } from '../index';

export class App extends React.Component {

  state = {
    data: [{name: 'anit', age: '20'}, {name: 'not anit', age: '20'}],
  };

  render() {
    new ThemeService();
    cssRule('span, div, input, button', {
      fontSize: '14px',
    });
    return (
      <div>
        <Table
          data={this.state.data}
          columns={[{
            key: 'name', header: 'Name', dataIndex: 'name',
          }, {
            key: 'age',
            header: 'Age',
            dataIndex: 'age',
          }]}
        />
        <Button onClick={() => this.setState({data: [...this.state.data, {name: 'ba', age: '20'}]})}>
          HELLO
        </Button>
      </div>
    );
  }
}
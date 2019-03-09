import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Table } from './Table';
import { Button, Input } from '../index';
import { FaUser, FaPassport } from 'react-icons/fa';

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
        <Input
          placeholder='Username'
          before={<FaUser />}
        />
        <Input
          placeholder='Password'
          before={<FaPassport />}
        />
      </div>
    );
  }
}
import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule, cssRaw } from 'typestyle';
import { AutoComplete } from './AutoComplete';

export class App extends React.Component {

  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({ value: e });
  }

  render() {
    new ThemeService();
    cssRule('span, div, input, button', {
      fontSize: '14px',
    });

    cssRaw(`
      @import url('https://fonts.googleapis.com/css?family=Comfortaa');
      * {
        font-family: 'Comfortaa', cursive;
      }
    `);

    return (
      <div>
        <AutoComplete
          data={['FULL_TIME', 'INTERN', 'CONSULTANT'].map(v => ({ name: v, id: v }))}
          value={this.state.value}
          uniqueIdentifier='id'
          displayProp='name'
          inputProps={{ before: 'Employment Type' }}
          onChange={(v) => this.onChange(v)}
        />
      </div>
    );
  }
}

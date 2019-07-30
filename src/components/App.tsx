import * as React from 'react';
import { AutoComplete } from './AutoComplete';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div>
        <AutoComplete
          data={[{ a: 'a' }, { a: 'b' }]}
          value={'a'}
          uniqueIdentifier={(v) => v.a}
          displayProp={(v) => v.a}
        />
      </div>
    );
  }
}

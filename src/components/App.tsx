import * as React from 'react';
import { AutoComplete } from './AutoComplete';
import { MdAcUnit } from 'react-icons/md';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {

    return (
      <div>
        <AutoComplete
          data={[1, 2]}
          value={2}
          uniqueIdentifier={e => `${e}` as any}
          displayProp={e => e && e.toString()}
          inputProps={{ label: 'hello', required: true, before: <MdAcUnit /> }}
        />
      </div>
    );
  }
}

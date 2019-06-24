import * as React from 'react';
import { AutoComplete } from './AutoComplete';
import { MdAcUnit, MdPermIdentity } from 'react-icons/md';
import { Popover } from './Popover';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {

    return (
      <div>
        <Popover
          trigger='onClick'
          title='Profile'
          content='hello'
        >
          <MdPermIdentity className='icons-big' />
        </Popover>
      </div>
    );
  }
}

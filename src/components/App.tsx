import * as React from 'react';
import { Button } from './Button';
import { ButtonGroup } from './Button/ButtonGroup';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {

    return (
      <div>
        <ButtonGroup>
          <Button>hello</Button>
          <Button href='#'>ola</Button>
        </ButtonGroup>
      </div>
    );
  }
}

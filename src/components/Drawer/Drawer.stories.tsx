import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Drawer } from './';
import { Button } from '../Button';
import { RadioGroup, Radio } from '../Radio';

const stories = storiesOf('Drawer', module);

const WithState = (props) => {
  const [state, setState] = React.useState({});
  return (
    <div>{props.children(state, setState)}</div>
  );
};

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <Drawer
      header='Basic Drawer'
      isVisible={true}
    >
      <p>LOREM IPSUM....</p>
      <p>LOREM IPSUM....</p>
      <p>LOREM IPSUM....</p>
      <p>LOREM IPSUM....</p>
    </Drawer>
  )),
);

stories.add(
  'Custom Position',
  withInfo({ inline: true })(() => (
    <WithState>
      {(state, setState) => (
        <>
          <Drawer
            header='Basic Drawer'
            placement={state.position}
            isVisible={true}
          >
            <p>LOREM IPSUM....</p>
            <p>LOREM IPSUM....</p>
            <p>LOREM IPSUM....</p>
            <p>LOREM IPSUM....</p>
            <RadioGroup
              name='position'
              onChange={(e) => setState({ position: e.target.value })}
              value={state.position}
            >
              <Radio label='Left' value='left' />
              <Radio label='Right' value='right' />
              <Radio label='Top' value='top' />
              <Radio label='Bottom' value='bottom' />
            </RadioGroup>
          </Drawer>
        </>
      )}
    </WithState>
  )),
);

stories.add(
  'With closable prop',
  withInfo({ inline: true })(() => (
    <WithState>
      {(state, setState) => (
        <>
          <Drawer
            header='Basic Drawer'
            placement='top'
            isVisible={state.isVisible}
            onClose={() => setState({ isVisible: false })}
            closable
          >
            <p>LOREM IPSUM....</p>
            <p>LOREM IPSUM....</p>
            <p>LOREM IPSUM....</p>
            <p>LOREM IPSUM....</p>
          </Drawer>
          <Button onClick={() => setState({ isVisible: true })}>Open</Button>
        </>
      )}
    </WithState>
  )),
);
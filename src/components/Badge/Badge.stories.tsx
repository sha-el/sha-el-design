import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Badge, Button } from '../../index';
import { MdNotifications } from 'react-icons/md';

const stories = storiesOf('Badge', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <Badge count={2}>
      <Button>Submit</Button>
    </Badge>
  )),
);

stories.add(
  'With Colors',
  withInfo({ inline: true })(() => (
    <Badge count={3} color='green'>
      <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
        <MdNotifications />
      </div>
    </Badge>
  )),
);

stories.add(
  'With Colors',
  withInfo({ inline: true })(() => (
    <Badge count={3} color='green'>
      <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
        <MdNotifications />
      </div>
    </Badge>
  )),
);

stories.add(
  'With Just a Dot',
  withInfo({ inline: true })(() => (
    <Badge color='green'>
      <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
        <MdNotifications />
      </div>
    </Badge>
  )),
);

stories.add(
  'With Max Count',
  withInfo({ inline: true })(() => (
  <>
    <Badge count={22} maxCount={99} color='#f60'>
      <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
        <MdNotifications />
      </div>
    </Badge>
    <Badge count={139} maxCount={99} color='#f60'>
      <div style={{ fontSize: '20px', padding: '20px', background: '#fcf', marginLeft: '20px' }}>
        <MdNotifications />
      </div>
    </Badge>
  </>
  )),
);
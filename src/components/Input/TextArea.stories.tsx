import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Textarea } from './index';

const stories = storiesOf('Textarea', module);

stories.add(
  'Basic Textarea',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <Textarea rows={8} cols={10} placeholder={'Enter'} />
    </div>
  )),
);

stories.add(
  'Textarea with Label',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <Textarea rows={8} cols={10} label={'Label'} />
    </div>
  )),
);

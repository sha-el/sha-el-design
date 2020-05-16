import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { TextArea } from './index';

const stories = storiesOf('TextArea', module);

stories.add(
  'Basic TextArea',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <TextArea rows={8} cols={10} placeholder={'Enter'} />
    </div>
  )),
);

stories.add(
  'TextArea with Label',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <TextArea rows={8} cols={10} label={'Label'} />
    </div>
  )),
);

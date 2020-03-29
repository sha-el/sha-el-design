import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Input } from '../Input';
import { Card } from '../Card';
import { MdEmail, MdSubject } from 'react-icons/md';

const stories = storiesOf('Input', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <Input placeholder='Label' />
    </div>
  )),
);

stories.add(
  'With Floating Label',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <Input label='Label' />
    </div>
  )),
);

stories.add(
  'With Error and hint',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <Input placeholder='With Error' label='Label' error='Some Error' hint='Please enter' />
    </div>
  )),
);

stories.add(
  'With Before and after elements',
  withInfo({ inline: true })(() => (
    <div style={{ padding: '10px' }}>
      <Input label='Label' before={<MdEmail />} after={<MdSubject />} />
    </div>
  )),
);
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Divider } from './Divider';
import { MdCrop } from 'react-icons/md';

const stories = storiesOf('Divider', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <Divider />
  )),
);

stories.add(
  'With Children and custom color',
  withInfo({ inline: true })(() => (
    <Divider color='red'><MdCrop /></Divider>
  )),
);
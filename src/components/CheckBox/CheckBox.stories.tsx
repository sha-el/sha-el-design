import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { CheckBox } from './CheckBox';

const stories = storiesOf('Checkbox', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <CheckBox />
  )),
);

stories.add(
  'With Label',
  withInfo({ inline: true })(() => (
    <CheckBox label='Done?' />
  )),
);

stories.add(
  'With Error',
  withInfo({ inline: true })(() => (
    <CheckBox label='Done?' error='Some Error' />
  )),
);

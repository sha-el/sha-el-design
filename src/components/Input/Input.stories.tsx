import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Input } from '../Input';

const stories = storiesOf('Input', module);

stories.add(
  'Basic',
  withInfo()(() => (
    <Input />
  )),
);

stories.add(
  'With Error',
  withInfo()(() => (
    <Input error='Some Error' />
  )),
);
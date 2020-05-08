import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Loading } from './Loading';

const stories = storiesOf('Circular Loading', module);

stories.add(
  'isLoading set to true',
  withInfo({ inline: true })(() => (
    <Loading isLoading={true} />
  )),
);
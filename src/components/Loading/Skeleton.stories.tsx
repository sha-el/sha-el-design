import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Skeleton } from './Skeleton';

const stories = storiesOf('Skeleton', module);

stories.add(
  'With custom icons and iconBgColor',
  withInfo({ inline: true })(() => (
    <Skeleton isLoading={true} />
  )),
);
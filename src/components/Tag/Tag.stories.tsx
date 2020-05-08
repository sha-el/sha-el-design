import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Tag } from './Tag';

const stories = storiesOf('Tag', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => {
    return (
      <Tag color='red'>Hello</Tag>
    );
  }),
);

stories.add(
  'Outline',
  withInfo({ inline: true })(() => {
    return (
      <Tag outline color='red'>Hello</Tag>
    );
  }),
);

stories.add(
  'Chips',
  withInfo({ inline: true })(() => {
    return (
      <Tag color='red' chips>Hello</Tag>
    );
  }),
);
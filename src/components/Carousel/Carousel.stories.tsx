import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Carousel } from './Carousel';

const stories = storiesOf('Carousel', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <Carousel width='100%'>
      <h1>SLIDE 1</h1>
      <h1>SLIDE 2</h1>
      <h1>SLIDE 3</h1>
      <h1>SLIDE 4</h1>
    </Carousel>
  )),
);

stories.add(
  'With auto scroll',
  withInfo({ inline: true })(() => (
    <Carousel width='100%' autoScroll>
      <h1>SLIDE 1</h1>
      <h1>SLIDE 2</h1>
      <h1>SLIDE 3</h1>
      <h1>SLIDE 4</h1>
    </Carousel>
  )),
);
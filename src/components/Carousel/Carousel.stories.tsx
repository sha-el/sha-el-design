import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Carousel, CarouselProps } from './Carousel';

export default {
  title: 'Display/Carousel',
  component: Carousel,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CarouselProps> = (args) => (
  <Carousel {...args}>
    <h1>SLIDE 1</h1>
    <h1>SLIDE 2</h1>
    <h1>SLIDE 3</h1>
    <h1>SLIDE 4</h1>
  </Carousel>
);

export const ManualScroll = Template.bind({});

export const AutoScroll = Template.bind({});
AutoScroll.args = {
  autoScroll: true,
  width: '100%',
};

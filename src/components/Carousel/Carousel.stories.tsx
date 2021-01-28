import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { Carousel, CarouselProps } from './Carousel';
import { Button } from '../Button';

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

export const HideDots = Template.bind({});
HideDots.args = {
  ...AutoScroll.args,
  hideDots: true,
};

export const Controlled: Story<CarouselProps> = (args) => {
  const [value, updateValue] = useState(0);

  return (
    <>
      <Carousel {...args} current={value}>
        <h1>SLIDE 1</h1>
        <h1>SLIDE 2</h1>
        <h1>SLIDE 3</h1>
        <h1>SLIDE 4</h1>
      </Carousel>
      <Button primary flat onClick={() => updateValue(0)}>
        1
      </Button>
      <Button primary flat onClick={() => updateValue(1)}>
        2
      </Button>
      <Button primary flat onClick={() => updateValue(2)}>
        3
      </Button>
      <Button primary flat onClick={() => updateValue(3)}>
        4
      </Button>
    </>
  );
};

import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Slider, SliderProps } from './Slider';

export default {
  title: 'Inputs/Slider',
  component: Slider,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<SliderProps> = (args) => <Slider {...args} />;

export const Verticle: Story<SliderProps> = (args) => (
  <div style={{ height: '400px' }}>
    <Slider vertical {...args} />
  </div>
);

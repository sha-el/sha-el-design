import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Radio } from '.';
import { RadioProps } from './Radio';

export default {
  title: 'Inputs/Radio',
  component: Radio,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<RadioProps> = (args) => <Radio {...args} />;

export const Basic = Template.bind({});

export const Label = Template.bind({});
Label.args = {
  label: 'Label',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Label',
  error: 'error',
};

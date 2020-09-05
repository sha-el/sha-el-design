import React from 'react';
import { Story, Meta } from '@storybook/react';

import { TimePicker, TimePickerProps } from './TimePicker';

export default {
  title: 'Inputs/TimePicker',
  component: TimePicker,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TimePickerProps> = (args) => <TimePicker {...args} />;

export const Basic = Template.bind({});

import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DatePicker, DatePickerProps } from './DatePicker';

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Basic = Template.bind({});

export const DisabledDates = Template.bind({});
DisabledDates.args = {
  disabledDate: ([__year, __month, day]) => day > 5 && day < 25,
};

export const WithTimePicker = Template.bind({});
WithTimePicker.args = {
  timePickerProps: {},
};

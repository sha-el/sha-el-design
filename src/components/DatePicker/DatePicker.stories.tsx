import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { DatePicker, DatePickerProps } from './DatePicker';

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const [date, updateDate] = useState(null);
  return <DatePicker {...args} date={date} onChange={(e) => updateDate(e)} />;
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Enter Date',
};

export const DisabledDates = Template.bind({});
DisabledDates.args = {
  disabledDate: (date: Date) => date.getDate() > 5 && date.getDate() < 25,
};

export const WithTimePicker = Template.bind({});
WithTimePicker.args = {
  timePickerProps: {},
};

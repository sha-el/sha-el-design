import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { TimePicker, TimePickerProps } from './TimePicker';

export default {
  title: 'Inputs/TimePicker',
  component: TimePicker,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TimePickerProps> = (args) => {
  const [time, updateTime] = useState<Date>();
  return (
    <>
      <TimePicker
        label="Time"
        {...args}
        time={time}
        onChange={(e) => {
          return updateTime(e);
        }}
      />
      <div style={{ paddingBottom: '500px' }} />
    </>
  );
};

export const Basic = Template.bind({});
export const Use12HourFormat = Template.bind({});
Use12HourFormat.args = {
  use12Hour: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Borderless = Template.bind({});
Borderless.args = {
  borderless: true,
};

export const OpenState = Template.bind({});
OpenState.args = {
  open: true,
};

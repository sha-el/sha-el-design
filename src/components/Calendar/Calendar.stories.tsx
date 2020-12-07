import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Calendar } from '../..';
import { CalendarProps, weeksEnum } from './Calendar';

export default {
  title: 'Display/Calendar',
  component: Calendar,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

export const Basic = Template.bind({});

export const CellAppend = Template.bind({});
CellAppend.args = {
  cellRender: ([__year, __month, day], week: weeksEnum) => {
    if (week === weeksEnum.SUNDAY) {
      return <div style={{ background: 'red', color: 'white', width: '100%' }}>{day}</div>;
    }
  },
};

export const Events = Template.bind({});
Events.args = {
  callendarEvents: [
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      eventName: 'Event 1',
      color: '#fcf',
    },
    {
      startDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      eventName: 'Event 2',
    },
  ],
  disabledDate: ([__year, __month, day]) => day === 5,
};

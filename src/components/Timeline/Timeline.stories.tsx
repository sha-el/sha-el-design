import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Timeline } from './index';
import { TimelineItem } from './TimelineItem';
import { Card } from '../Card';
import { MdEmail } from 'react-icons/md';
import { TimelineProps } from './Timeline';

export default {
  title: 'Display/Timeline',
  component: Timeline,
  subcomponents: { TimelineItem },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<TimelineProps> = (args) => (
  <Timeline {...args}>
    <TimelineItem iconBgColor="#2196F3">
      <Card>SMS</Card>
    </TimelineItem>
    <TimelineItem iconBgColor="#F44336">
      <Card>SMS</Card>
    </TimelineItem>
    <TimelineItem icon={<MdEmail />} iconBgColor="#4CAF50">
      <Card>SMS</Card>
    </TimelineItem>
    <TimelineItem>
      <Card>SMS</Card>
    </TimelineItem>
  </Timeline>
);

export const RightPosition = Basic.bind({});
RightPosition.args = {
  position: 'right',
};

export const AlternatePosition = Basic.bind({});
AlternatePosition.args = {
  position: 'alternate',
};

export const Extra: Story<TimelineProps> = (args) => (
  <Timeline {...args}>
    <TimelineItem extra="2010-20-20" iconBgColor="#2196F3">
      <Card>SMS</Card>
    </TimelineItem>
    <TimelineItem extra="2010-20-20" iconBgColor="#F44336">
      <Card>SMS</Card>
    </TimelineItem>
    <TimelineItem extra="2010-20-20" icon={<MdEmail />} iconBgColor="#4CAF50">
      <Card>SMS</Card>
    </TimelineItem>
    <TimelineItem extra="2010-20-20">
      <Card>SMS</Card>
    </TimelineItem>
  </Timeline>
);

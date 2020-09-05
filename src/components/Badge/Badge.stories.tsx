import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Badge, Button } from '../../index';
import { MdNotifications } from 'react-icons/md';
import { BadgeProps } from './Badge';

export default {
  title: 'Display/Badge',
  component: Badge,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  count: 2,
  children: <Button>Submit</Button>,
};

export const WithColors = Template.bind({});
WithColors.args = {
  count: 3,
  color: 'green',
  children: (
    <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
      <MdNotifications />
    </div>
  ),
};

export const WithJustADot = Template.bind({});
WithJustADot.args = {
  // count: 3,
  color: 'green',
  children: (
    <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
      <MdNotifications />
    </div>
  ),
};

export const WithMaxCount = Template.bind({});
WithMaxCount.args = {
  count: 22,
  maxCount: 99,
  color: '#f60',
  children: (
    <div style={{ fontSize: '20px', padding: '20px', background: '#fcf' }}>
      <MdNotifications />
    </div>
  ),
};

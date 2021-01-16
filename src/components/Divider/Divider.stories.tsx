import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Divider, DividerProps } from './Divider';
import { MdCrop } from 'react-icons/md';
import { Card } from '../..';

export default {
  title: 'Layout/Divider',
  component: Divider,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<DividerProps> = (args) => (
  <Card>
    <Divider {...args} />
  </Card>
);

export const Basic = Template.bind({});

export const Color = Template.bind({});
Color.args = {
  color: 'red',
};

export const Children = Template.bind({});
Children.args = {
  color: 'red',
  children: <MdCrop />,
};

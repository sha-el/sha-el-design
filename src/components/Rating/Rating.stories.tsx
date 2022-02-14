import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Rating, RatingProps } from './Rating';
import { Card } from '../..';
import { AiFillApple, AiOutlineApple } from 'react-icons/ai';

export default {
  title: 'Inputs/Rating',
  component: Rating,
  argTypes: {
    color: { control: 'color' },
  },
} as Meta;

const Template: Story<RatingProps> = (args) => (
  <Card>
    <Rating {...args} />
  </Card>
);

export const UnControlled = Template.bind({});
UnControlled.args = {
  value: 2,
  totalCount: 5,
};

export const NonEditable = Template.bind({});
NonEditable.args = {
  value: 2,
  totalCount: 5,
  editable: false,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  value: 2,
  color: '#f60',
  totalCount: 5,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  value: 2,
  totalCount: 5,
  size: 30,
};

export const CustomPrecision = Template.bind({});
CustomPrecision.args = {
  value: 2.5,
  totalCount: 5,
  precision: 0.5,
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  fillIcon: <AiFillApple size={30} />,
  emptyIcon: <AiOutlineApple size={30} />,
  value: 2.5,
  totalCount: 5,
  precision: 0.5,
};

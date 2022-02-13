import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Progress, ProgressProps } from './Progress';
import { MdSave } from 'react-icons/md';

export default {
  title: 'Feedback/Progress',
  component: Progress,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<ProgressProps> = (args) => <Progress {...args} />;
Basic.args = {
  percent: 50,
  color: 'primary',
};

export const Label = Basic.bind({});
Label.args = {
  ...Basic.args,
  label: <MdSave />,
};

export const Circle = Basic.bind({});
Circle.args = {
  ...Basic.args,
  label: '50%',
  type: 'circle',
};

export const CustomStyle = Basic.bind({});
CustomStyle.args = {
  ...Basic.args,
  label: '50%',
  style: {
    height: '100px',
  },
};

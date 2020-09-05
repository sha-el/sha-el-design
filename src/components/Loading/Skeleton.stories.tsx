import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Skeleton } from '.';
import { LoadingProps } from './Loading';

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LoadingProps> = (args) => <Skeleton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  isLoading: true,
};

export const Size = Template.bind({});
Size.args = {
  size: 'big',
  isLoading: true,
};

export const Color = Template.bind({});
Color.args = {
  color: 'red',
  isLoading: true,
};

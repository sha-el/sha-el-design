import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Skeleton } from '.';
import { SkeletonProps } from './Skeleton';

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  isLoading: true,
};

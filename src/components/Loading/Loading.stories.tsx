import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Loading, LoadingProps } from './Loading';

export default {
  title: 'Feedback/Loading',
  component: Loading,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

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

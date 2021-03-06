import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Tag, TagProps } from './Tag';
import { MdVerifiedUser } from 'react-icons/md';

export default {
  title: 'Display/Tag',
  component: Tag,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  color: 'red',
  children: 'basic',
};

export const Outline = Template.bind({});
Outline.args = {
  color: 'red',
  outline: true,
  children: 'Outline',
};

export const Chips = Template.bind({});
Chips.args = {
  color: 'red',
  chips: true,
  children: 'Chips',
};

export const Icon = Template.bind({});
Icon.args = {
  color: '#f60',
  children: 'Chips',
  icon: <MdVerifiedUser />,
};

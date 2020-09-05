import React from 'react';
import { Story, Meta } from '@storybook/react';

import { CheckBox, CheckBoxProps } from './CheckBox';

export default {
  title: 'Inputs/CheckBox',
  component: CheckBox,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CheckBoxProps> = (args) => <CheckBox {...args} />;
export const Basic = Template.bind({});

export const Label = Template.bind({});
Label.args = {
  label: 'Label',
};

export const Error = Template.bind({});
Error.args = {
  error: 'Error',
};

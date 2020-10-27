import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Input } from './Input';
import { MdEmail, MdSubject } from 'react-icons/md';
import { Divider } from '../Divider';
import { InputProps } from './Input';

export default {
  title: 'Inputs/Input',
  component: Input,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<InputProps> = (args) => (
  <>
    <Input {...args} />
    <Divider />
    <Input {...args} borderLess />
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Placeholder',
};

export const Label = Template.bind({});
Label.args = {
  label: 'Label',
};

export const ErrorAndHint = Template.bind({});
ErrorAndHint.args = {
  error: 'Some error',
  hint: 'Some hint',
};

export const BeforeAndAfter = Template.bind({});
BeforeAndAfter.args = {
  before: <MdEmail />,
  after: <MdSubject />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Disabled',
  disabled: true,
};

import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Input } from './Input';
import { MdEmail, MdSubject } from 'react-icons/md';
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
    <br />
    <Input borderless {...args} />
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
  label: 'Label',
};

export const BeforeAndAfter = Template.bind({});
BeforeAndAfter.args = {
  before: <MdEmail />,
  after: <MdSubject />,
  label: 'Label',
};

export const Disabled = Template.bind({});
Disabled.args = {
  defaultValue: 'Disabled',
  disabled: true,
  label: 'Disabled',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Required',
  required: true,
};

export const Filled = Template.bind({});
Filled.args = {
  filled: true,
};

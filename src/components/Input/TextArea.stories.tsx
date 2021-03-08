import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Textarea } from './Textarea';
import { MdEmail, MdSubject } from 'react-icons/md';
import { Divider } from '../Divider';
import { TextareaProps } from './Textarea';

export default {
  title: 'Inputs/Textarea',
  component: Textarea,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TextareaProps> = (args) => (
  <>
    <Textarea {...args} />
    <Divider />
    <Textarea {...args} borderless />
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'placeholder',
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

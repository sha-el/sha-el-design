import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Inputs/Switch',
  component: Switch,
  argTypes: {
    color: { control: 'color' },
  },
} as Meta;

const Template: Story<SwitchProps> = (args) => {
  const [checked, updateChecked] = useState(args.checked);
  return (
    <>
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => {
          return updateChecked(e.target.checked);
        }}
      />
      <Switch
        {...args}
        checked={checked}
        color="secondary"
        onChange={(e) => {
          return updateChecked(e.target.checked);
        }}
      />
      <Switch
        {...args}
        checked={checked}
        color="green"
        onChange={(e) => {
          return updateChecked(e.target.checked);
        }}
      />
      <Switch
        {...args}
        checked={checked}
        color="error"
        onChange={(e) => {
          return updateChecked(e.target.checked);
        }}
      />
    </>
  );
};

export const Colors = Template.bind({});
Colors.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: true,
  disabled: true,
};

export const Label = Template.bind({});
Label.args = {
  checked: true,
  label: 'On',
};

export const Size = Template.bind({});
Size.args = {
  checked: true,
  label: 'On',
  size: 'small',
};

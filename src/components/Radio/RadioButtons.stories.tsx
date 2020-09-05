import React from 'react';
import { Story, Meta } from '@storybook/react';

import { RadioButton } from '.';
import { RadioProps } from './Radio';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

export default {
  title: 'Inputs/RadioButton',
  component: RadioButton,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<RadioProps> = (args) => {
  const [checked, update] = React.useState(false);
  return <RadioButton label="Select" checked={checked} onChange={(e) => update(e.target.checked)} {...args} />;
};

export const WithGroup: Story<RadioGroupProps> = (args) => {
  const [best, updatebest] = React.useState('Bruce');

  return (
    <RadioGroup {...args} value={best} name="rich" onChange={(e) => updatebest(e.target.value)}>
      <RadioButton value="Bruce" label="Bruce" />
      <RadioButton value="Stark" label="Stark" />
    </RadioGroup>
  );
};

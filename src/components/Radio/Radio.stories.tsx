import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Radio, RadioGroup } from '.';
import { RadioProps } from './Radio';

export default {
  title: 'Inputs/Radio',
  component: Radio,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<RadioProps> = (args) => <Radio {...args} />;

export const Basic = Template.bind({});

export const Label = Template.bind({});
Label.args = {
  label: 'Label',
};

export const withRadioGroup: Story<RadioProps> = (args) => {
  const [best, updatebest] = React.useState('Bruce');

  return (
    <RadioGroup {...args} value={best} name="rich" onChange={(e) => updatebest(e.target.value)}>
      <Radio value="Bruce" label="Bruce" />
      <Radio value="Stark" label="Stark" />
    </RadioGroup>
  );
};

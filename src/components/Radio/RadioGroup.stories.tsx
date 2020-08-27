import React from 'react';
import { Story, Meta } from '@storybook/react';

import { RadioGroup } from '.';
import { Radio, RadioProps } from './Radio';

export default {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<RadioProps> = (args) => {
  const [best, updatebest] = React.useState('Bruce');

  return (
    <RadioGroup {...args} value={best} name="rich" onChange={(e) => updatebest(e.target.value)}>
      <Radio value="Bruce" label="Bruce" />
      <Radio value="Stark" label="Stark" />
    </RadioGroup>
  );
};

export const Basic = Template.bind({});

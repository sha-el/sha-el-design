import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Stepper, Step, StepperProps } from './Stepper';
import { MdClearAll, MdHome } from 'react-icons/md';
import { Button } from '../Button';

export default {
  title: 'Navigation/Stepper',
  component: Stepper,
  subcomponents: { Step },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<StepperProps> = (args) => {
  const [step, updateStep] = React.useState(0);
  console.log(step);
  return (
    <div style={{ minWidth: '800px' }}>
      <Stepper {...args} current={step} onChange={updateStep} />
      <Button primary onClick={() => updateStep((step + 1) % 3)}>
        Next
      </Button>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: [
    <Step title="Enter User Details" description="This is a description text" key="1" icon={<MdHome />}>
      Step 1
    </Step>,
    <Step title="Enter Company Details" key="2">
      Step 2
    </Step>,
    <Step key="3" icon={<MdClearAll />}>
      Step 3
    </Step>,
  ],
};

export const Error = Template.bind({});
Error.args = {
  children: [
    <Step title="Enter User Details" error="Some error" key="1" icon={<MdHome />}>
      Step 1
    </Step>,
    <Step title="Enter Company Details" key="2">
      Step 2
    </Step>,
    <Step key="3" icon={<MdClearAll />}>
      Step 3
    </Step>,
  ],
};

export const NonLinear = Template.bind({});
NonLinear.args = {
  nonLinear: true,
  children: [
    <Step error="Some error" key="1" icon={<MdHome />}>
      Step 1
    </Step>,
    <Step title="Enter Company Details" key="2">
      Step 2
    </Step>,
    <Step title="Disabled Step" disabled key="3" icon={<MdClearAll />}>
      Step 3
    </Step>,
  ],
};

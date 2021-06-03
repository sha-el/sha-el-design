import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Tooltip } from '../..';

import { Button } from '../Button';
import { Text } from '../Text';
import { TooltipProps } from './Tooltip';

export default {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<TooltipProps> = (args) => {
  return (
    <Tooltip {...args} overlay={<Text>Hello</Text>}>
      <Button>Hello</Button>
    </Tooltip>
  );
};

export const ControlledToolTip = (args: Partial<TooltipProps>) => {
  const [state, updateState] = useState(args.visible);

  return (
    <>
      <Tooltip
        {...args}
        visible={state}
        onVisibleChange={(v) => {
          updateState(v);
          args.onVisibleChange(v);
        }}
        overlay={<Text id="text">Hello World</Text>}
      >
        <Button>Hover Me</Button>
      </Tooltip>
      <Button onClick={() => updateState(!state)}>Click Me</Button>
    </>
  );
};

import React from 'react';
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

export const Basic: Story<TooltipProps> = (args) => (
  <Tooltip {...args} placement="top" overlay={<Text>Content</Text>}>
    <Button>Hello</Button>
  </Tooltip>
);

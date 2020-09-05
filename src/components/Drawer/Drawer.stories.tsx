import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Drawer } from './';
import { DrawerProps } from './Drawer';
import { Button } from '../Button';

export default {
  title: 'Navigation/Drawer',
  component: Drawer,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<DrawerProps> = (args) => {
  const [open, update] = React.useState(true);
  return (
    <>
      <Button onClick={() => update(!open)}>Open</Button>
      <Drawer {...args} isVisible={open} onClose={() => update(!open)} />
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: (
    <>
      <p>LOREM IPSUM....</p>
      <p>LOREM IPSUM....</p>
      <p>LOREM IPSUM....</p>
      <p>LOREM IPSUM....</p>
    </>
  ),
};

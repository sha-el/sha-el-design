import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MdHome, MdNavigateNext } from 'react-icons/md';
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';
import { MenuItem, Menu } from '../Menu';
import { Button } from '../Button';

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  seperator: '/',
  children: [
    <a key="1" href="#">
      Home
    </a>,
    <a key="2" href="#">
      Breadcrumb
    </a>,
  ],
};

export const CustomSeperator = Template.bind({});
CustomSeperator.args = {
  ...Basic.args,
  seperator: <MdNavigateNext />,
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  seperator: <MdNavigateNext />,
  children: [
    <a key="1" href="#">
      <MdHome />
    </a>,
    <Menu trigger="onMouseOver" densed placement="bottom" key="2" anchor={<Button flat>Options</Button>}>
      <MenuItem>Option 1</MenuItem>
    </Menu>,
  ],
};

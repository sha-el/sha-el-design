import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MdHome, MdNavigateNext } from 'react-icons/md';
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';
import { MenuItemGroup, MenuItem } from '../Menu';

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
  seperator: '>',
  paths: [() => <a href="#">Home</a>, () => <a href="#">Breadcrumb</a>],
};

export const Icons = Template.bind({});
Icons.args = {
  seperator: <MdNavigateNext />,
  paths: [() => <a href="#">Home</a>, () => <a href="#">Breadcrumb</a>],
};

export const Menu = Template.bind({});
Menu.args = {
  seperator: '>',
  paths: [
    () => (
      <a href="#">
        <MdHome />
      </a>
    ),
    () => (
      <MenuItemGroup title="hello" inline={false}>
        <MenuItem name="1">Option 1</MenuItem>
      </MenuItemGroup>
    ),
  ],
};

import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MenuItem, Menu } from '.';
import { Button } from '../Button';
import { MenuProps } from './Menu';
import { MdAcUnit, MdChevronRight, MdExpandMore } from 'react-icons/md';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  subcomponents: { MenuItem },
} as Meta;

export const InlineMenu: Story<MenuProps> = (args) => (
  <Menu {...args} anchor={<Button flat>OPEN MENU</Button>}>
    <MenuItem element={<a />}>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
    <Menu
      trigger="onMouseOver"
      anchor={
        <MenuItem action={<MdChevronRight />} icon={<MdAcUnit />}>
          More
        </MenuItem>
      }
    >
      <MenuItem element={<a />}>Option 4</MenuItem>
      <MenuItem>Option 5</MenuItem>
      <MenuItem>Option 6</MenuItem>
      <Menu trigger="onMouseOver" placement="right" anchor={<MenuItem icon={<MdAcUnit />}>Even More</MenuItem>}>
        <MenuItem element={<a />}>Option 7</MenuItem>
        <MenuItem>Option 8</MenuItem>
        <MenuItem>Option 9</MenuItem>
      </Menu>
    </Menu>
  </Menu>
);

export const HorizontalMenu: Story<MenuProps> = (args) => (
  <Menu mode="horizontal" {...args} anchor={<Button flat>OPEN MENU</Button>}>
    <MenuItem element={<a />}>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
    <Menu
      trigger="onMouseOver"
      anchor={
        <MenuItem action={<MdExpandMore />} icon={<MdAcUnit />}>
          More
        </MenuItem>
      }
    >
      <MenuItem element={<a />}>Option 4</MenuItem>
      <MenuItem>Option 5</MenuItem>
      <MenuItem>Option 6</MenuItem>
      <Menu trigger="onMouseOver" placement="right" anchor={<MenuItem icon={<MdAcUnit />}>Even More</MenuItem>}>
        <MenuItem element={<a />}>Option 7</MenuItem>
        <MenuItem>Option 8</MenuItem>
        <MenuItem>Option 9</MenuItem>
      </Menu>
    </Menu>
  </Menu>
);

HorizontalMenu.args = {
  mode: 'horizontal',
  elevation: 0,
};

export const VerticalMenu = HorizontalMenu.bind({});
VerticalMenu.args = {
  mode: 'vertical',
  elevation: 2,
};

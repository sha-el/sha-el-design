import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MenuItemGroup, MenuItem, Menu } from '.';
import { Button } from '../Button';
import { IoMdOptions } from 'react-icons/io';
import { MenuItemGroupProps } from './MenuItemGroup';

export default {
  title: 'Navigation/Menu',
  component: MenuItemGroup,
  subcomponents: { MenuItem, MenuItemGroup },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Collapsible: Story<MenuItemGroupProps> = (args) => (
  <Menu>
    <MenuItemGroup {...args} title="Options">
      <MenuItem element={<a />} name="1">
        Option 1
      </MenuItem>
      <MenuItem name="2">Option 2</MenuItem>
      <MenuItem name="2">Option 3</MenuItem>
    </MenuItemGroup>
  </Menu>
);

export const PopupMenu = Collapsible.bind({});
PopupMenu.args = {
  inline: false,
};

export const AnchorAndOffset = Collapsible.bind({});
AnchorAndOffset.args = {
  inline: false,
  position: 'bottom',
  anchor: (
    <span>
      <Button icon={<IoMdOptions />} />
    </span>
  ),
  offset: [0, -40],
};

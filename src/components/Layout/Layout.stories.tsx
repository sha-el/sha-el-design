import React from 'react';
import { Meta } from '@storybook/react';

import { Container, Content, SidePanel } from './';
import { Menu, MenuItem, MenuItemGroup } from '../Menu';
import { MdHome, Md3DRotation, MdAccountBox } from 'react-icons/md';

export default {
  title: 'Layout/Layouts',
  component: Container,
  subcomponents: { Content, SidePanel },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const BasicLayout = () => (
  <Container>
    <SidePanel>Side Panel</SidePanel>
    <Content>Container</Content>
  </Container>
);

export const SidePanelMenu = () => (
  <Container>
    <SidePanel>
      <Menu>
        <MenuItem icon={<MdHome />} active name="nav 1">
          NAV 1
        </MenuItem>
        <MenuItem icon={<Md3DRotation />} name="nav 2">
          NAV 2
        </MenuItem>
        <MenuItem icon={<MdAccountBox />} name="nav 3">
          NAV 3
        </MenuItem>
        <MenuItemGroup title="Group" icon={<MdHome />}>
          <MenuItem icon={<MdHome />} name="nav 1">
            NAV 1
          </MenuItem>
          <MenuItem icon={<Md3DRotation />} name="nav 2">
            NAV 2
          </MenuItem>
          <MenuItem icon={<MdAccountBox />} name="nav 3">
            NAV 3
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    </SidePanel>
    <Content>
      <div>Content</div>
    </Content>
  </Container>
);

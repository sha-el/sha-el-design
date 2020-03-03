import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Layout', module);

import { Container, Content, SidePanel } from './';
import { MenuItem, MenuItemGroup } from '../Menu';
import { MdHome, Md3DRotation, MdAccountBox } from 'react-icons/md';

stories.add(
  'Basic Layout',
  withInfo({ inline: true })(() => (
    <Container>
      <SidePanel>
        Side Panel
      </SidePanel>
      <Content>
        Container
      </Content>
    </Container>
  )),
);

stories.add(
  'With Side Panel Menu',
  withInfo({ inline: true })(() => (
    <Container>
      <SidePanel>
        <MenuItem icon={<MdHome />} active name='nav 1'>
          NAV 1
        </MenuItem>
        <MenuItem icon={<Md3DRotation />} name='nav 2'>
          NAV 2
        </MenuItem>
        <MenuItem icon={<MdAccountBox />} name='nav 3'>
          NAV 3
        </MenuItem>
        <MenuItemGroup title='Group' icon={<MdHome />}>
          <MenuItem icon={<MdHome />} name='nav 1'>
            NAV 1
        </MenuItem>
          <MenuItem icon={<Md3DRotation />} name='nav 2'>
            NAV 2
        </MenuItem>
          <MenuItem icon={<MdAccountBox />} name='nav 3'>
            NAV 3
        </MenuItem>
        </MenuItemGroup>
      </SidePanel>
      <Content>
        Container
      </Content>
    </Container>
  )),
);
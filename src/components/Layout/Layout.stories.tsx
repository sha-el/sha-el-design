import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Container, Content, SidePanel } from './';
import { Menu, MenuItem } from '../Menu';
import {
  MdHome,
  Md3DRotation,
  MdAccountBox,
  MdAcUnit,
  MdAccessTime,
  MdVerifiedUser,
  MdSettings,
  MdLink,
} from 'react-icons/md';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Popover } from '../..';
import { List, ListItem } from '../List';
import { Basic } from '../Page/Page.stories';
import { Tooltip } from '../Tooltip';

export default {
  title: 'Layout/Layouts',
  component: SidePanel,
  subcomponents: { Content, Container },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const BasicLayout: Story = () => (
  <Container>
    <SidePanel
      logo={<Md3DRotation size="50px" />}
      bottom={[
        <Popover
          key="bottom-2"
          placement="right"
          trigger="onMouseOver"
          overlay={
            <List elevation={0}>
              <ListItem>user option 1</ListItem>
              <ListItem>user option 2</ListItem>
              <ListItem>user option 3</ListItem>
            </List>
          }
        >
          <Button size="big" displayBlock flat primary icon={<MdVerifiedUser />} />
        </Popover>,
        <Menu key="bottom-1" anchor={<Button icon={<MdSettings />} flat displayBlock size="big" />}>
          <MenuItem icon={<MdHome />}>Setting 1</MenuItem>
          <MenuItem icon={<MdHome />} active>
            Setting 2
          </MenuItem>
          <MenuItem icon={<Md3DRotation />}>Setting 3</MenuItem>
          <MenuItem icon={<MdAccountBox />}>Setting 4</MenuItem>
        </Menu>,
      ]}
    >
      <Menu
        anchor={
          <Tooltip overlay="Link 1" placement="right">
            <Button icon={<MdAcUnit />} flat displayBlock size="big" />
          </Tooltip>
        }
      >
        <MenuItem icon={<MdHome />}>Home</MenuItem>
        <MenuItem icon={<MdHome />} active>
          NAV 1
        </MenuItem>
        <MenuItem icon={<Md3DRotation />}>NAV 2</MenuItem>
        <MenuItem icon={<MdAccountBox />}>NAV 3</MenuItem>
      </Menu>
      <Divider />
      <Menu anchor={<Button icon={<MdAccessTime />} flat displayBlock size="big" />}>
        <MenuItem icon={<MdHome />}>NAV 1</MenuItem>
        <MenuItem icon={<Md3DRotation />}>NAV 2</MenuItem>
        <MenuItem icon={<MdAccountBox />}>NAV 3</MenuItem>
      </Menu>
      <Tooltip placement="right" overlay="Direct Links">
        <Button icon={<MdLink />} flat displayBlock size="big" />
      </Tooltip>
    </SidePanel>
    <Content>
      <Basic />
    </Content>
  </Container>
);

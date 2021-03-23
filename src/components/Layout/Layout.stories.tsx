import React from 'react';
import { Meta } from '@storybook/react';

import { Container, Content, SidePanel } from './';
import { Menu, MenuItem } from '../Menu';
import { MdHome, Md3DRotation, MdAccountBox, MdAcUnit, MdAccessTime, MdVerifiedUser, MdSettings } from 'react-icons/md';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Popover } from '../..';
import { List, ListItem } from '../List';
import { Card } from '../Card';

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
    <SidePanel
      logo={<Md3DRotation size="50px" />}
      bottom={[
        <Popover
          key="bottom-2"
          position="right"
          trigger="onHover"
          style={{ child: { display: 'block' } }}
          animation="zoom"
          content={
            <List>
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
      <Menu anchor={<Button icon={<MdAcUnit />} flat displayBlock size="big" />}>
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
    </SidePanel>
    <Content>
      <Card>Container</Card>
    </Content>
  </Container>
);

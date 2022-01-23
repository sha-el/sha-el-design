import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Sidebar, SidebarProps } from './Sidebar';
import { VscMail, VscSmiley } from 'react-icons/vsc';
import { CollapsibleList, List, ListItem } from '../List';
import { FcSelfie } from 'react-icons/fc';
import { Divider } from '../Divider';
import { Button } from '../Button';
import { IoMdOptions } from 'react-icons/io';
import { MdSupervisorAccount } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesTwo } from 'react-icons/gi';

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SidebarProps> = (args) => (
  <Sidebar
    {...args}
    placement="left"
    brandIcon={<FcSelfie style={{ width: '65px', height: '50px' }} />}
    brandText="Sha el Design"
  >
    <List elevation={0}>
      <CollapsibleList header="Email" avatar={<VscMail style={{ width: '30px', height: '30px' }} />}>
        <ListItem>Add Email</ListItem>
        <ListItem>Email List</ListItem>
        <ListItem>Email Status</ListItem>
      </CollapsibleList>
      <CollapsibleList header="Email" avatar={<VscMail style={{ width: '30px', height: '30px' }} />}>
        <ListItem>Add Email</ListItem>
        <ListItem>Email List</ListItem>
        <ListItem>Email Status</ListItem>
      </CollapsibleList>
      <Divider />
      <ListItem element={<a />} selected avatar={<VscSmiley style={{ width: '30px', height: '30px' }} />}>
        All users
      </ListItem>
    </List>
  </Sidebar>
);

export const Basic = Template.bind({});

Basic.args = {
  collapsedWidth: 65,
  expandWidth: 260,
  anchor: <Button flat primary icon={<IoMdOptions />} />,
};

export const WithBottom = Template.bind({});

WithBottom.args = {
  ...Basic.args,
  bottom: (
    <List elevation={0}>
      <CollapsibleList header="My Account" avatar={<MdSupervisorAccount style={{ width: '30px', height: '30px' }} />}>
        <List elevation={0}>
          <ListItem avatar={<GiPerspectiveDiceSixFacesTwo />}>Change Password</ListItem>
        </List>
      </CollapsibleList>
    </List>
  ),
};

export const Responsive: Story<SidebarProps> = (args) => (
  <>
    <Sidebar
      {...args}
      placement="left"
      brandIcon={<FcSelfie style={{ width: '65px', height: '50px' }} />}
      brandText="Sha el Design"
      collapsedWidth={65}
      expandWidth={260}
      drawerOpen
      responsive
    >
      <List elevation={0}>
        <CollapsibleList header="Email" avatar={<VscMail style={{ width: '30px', height: '30px' }} />}>
          <ListItem>Add Email</ListItem>
          <ListItem>Email List</ListItem>
          <ListItem>Email Status</ListItem>
        </CollapsibleList>
        <Divider />
        <ListItem element={<a />} selected avatar={<VscSmiley style={{ width: '30px', height: '30px' }} />}>
          All users
        </ListItem>
      </List>
    </Sidebar>
    <h3>Reduce width to check responsive side bar</h3>
  </>
);

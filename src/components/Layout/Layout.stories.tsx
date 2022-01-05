import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Container, Content } from './';
import { Divider } from '../Divider';
import { CollapsibleList, List, ListItem } from '../List';
import { Basic } from '../Page/Page.stories';
import { Sidebar } from '../Sidebar';
import { FcSelfie } from 'react-icons/fc';
import { VscMail, VscSmiley } from 'react-icons/vsc';

export default {
  title: 'Layout/Layouts',
  component: Sidebar,
  subcomponents: { Content, Container },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const BasicLayout: Story = () => (
  <Container sidePanelInitialWidth={65}>
    <Sidebar
      placement="left"
      brandIcon={<FcSelfie style={{ width: '65px', height: '50px' }} />}
      brandText="Sha el Design"
      collapsedWidth={65}
      expandWidth={260}
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
    <Content>
      <Basic />
    </Content>
  </Container>
);

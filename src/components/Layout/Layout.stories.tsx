import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Container, Content } from './';
import { Divider } from '../Divider';
import { CollapsibleList, List, ListItem } from '../List';
import { Basic } from '../Page/Page.stories';
import { Sidebar } from '../Sidebar';
import { FcSelfie } from 'react-icons/fc';
import { VscMail, VscSmiley } from 'react-icons/vsc';
import { NavBar } from '../NavBar';
import { Md3DRotation } from 'react-icons/md';
import { Col, Row } from '../Grid';

export default {
  title: 'Layout/Layouts',
  component: Sidebar,
  subcomponents: { Content, Container },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const BasicLayout: Story = () => (
  <Container
    sidePanelInitialWidth={65}
    navBar={
      <NavBar bgColor="rgba(255, 255, 255, 0.8)" elevation={0}>
        <Row alignItems="center">
          <Col flex="0">
            <img
              style={{ width: '55px' }}
              src="https://camo.githubusercontent.com/7a51cd44a596528ddc34146d843b405827a011d095dc7ed2446f05302d1eb72a/68747470733a2f2f64726976652e676f6f676c652e636f6d2f75633f69643d317878376244776865394e4e6c39336a4a76794552627433556b79335862666356"
            />
          </Col>
          <Col flex="1" style={{ textAlign: 'center' }}>
            Title
          </Col>
          <Col flex="0">
            <Md3DRotation />
          </Col>
        </Row>
      </NavBar>
    }
    sideBar={
      <Sidebar
        placement="left"
        brandIcon={<FcSelfie style={{ width: '65px', height: '50px' }} />}
        brandText="Sha el Design"
        collapsedWidth={65}
        expandWidth={260}
        top={60}
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
    }
  >
    <Content>
      <Basic />
    </Content>
  </Container>
);

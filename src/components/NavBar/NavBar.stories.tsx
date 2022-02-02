import React from 'react';
import { Story, Meta } from '@storybook/react';

import { NavBar, NavBarProps } from './NavBar';
import { Md3DRotation } from 'react-icons/md';
import { Col, Row } from '../Grid';

export default {
  title: 'Navigation/NavBar',
  component: NavBar,
  argTypes: {},
} as Meta;

export const Basic: Story<NavBarProps> = (args) => <NavBar {...args} />;
Basic.args = {
  style: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  children: (
    <Row style={{ padding: '0 10px' }} alignItems="center" gutter={10}>
      <Col flex="0">
        <img
          style={{ width: '55px' }}
          src="https://camo.githubusercontent.com/7a51cd44a596528ddc34146d843b405827a011d095dc7ed2446f05302d1eb72a/68747470733a2f2f64726976652e676f6f676c652e636f6d2f75633f69643d317878376244776865394e4e6c39336a4a76794552627433556b79335862666356"
        />
      </Col>
      <Col flex="1" />
      <Col flex="0">Title</Col>
      <Col flex="1" />
      <Col flex="0">
        <Md3DRotation />
      </Col>
    </Row>
  ),
};

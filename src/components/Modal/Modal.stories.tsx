import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Modal } from '.';
import { Card, CardHeader } from '../Card';
import { Row, Col } from '../Grid';
import { ModalProps } from './Modal';

export default {
  title: 'Feedback/Modal',
  component: Modal,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<ModalProps> = (args) => {
  const [isVisible, toggle] = React.useState(true);
  return (
    <Modal {...args} isVisible={isVisible} onClose={() => toggle(false)}>
      <Row>
        <Col span={12}>Hello</Col>
        <Col span={12}>
          <Card>
            <CardHeader>Hello</CardHeader>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

Basic.args = {
  isVisible: true,
};

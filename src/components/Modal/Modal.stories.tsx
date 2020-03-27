import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Modal } from '.';
import { Card, CardHeader } from '../Card';
import { Row, Col } from '../Grid';

const stories = storiesOf('Modal', module);

stories.add(
  'Basic',
  withInfo()(() => (
    <Modal isVisible>
      <Row>
        <Col span={12}>
          Hello
        </Col>
        <Col span={12}>
          <Card>
            <CardHeader>Hello</CardHeader>
          </Card>
        </Col>
      </Row>
    </Modal>
  )),
);
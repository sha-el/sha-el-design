import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Grid', module);

import { Row, Col } from './';

stories.add(
  'using Flex',
  withInfo({ inline: true })(() => (
    <Row>
      <Col flex='1 1 200px' style={{ background: '#06e', color: '#fff' }}>
        flex=1 1 200px
      </Col>
      <Col flex='0 1 400px' style={{ background: '#0fe' }}>
        flex=0 1 400px
      </Col>
    </Row>
  )),
);

stories.add(
  'Justify Content',
  withInfo({ inline: true })(() => (
    <Row justifyContent='flex-end'>
      <Col flex='0 1 200px' style={{ background: '#06e', color: '#fff' }}>
        Col 1
      </Col>
      <Col flex='0 1 400px' style={{ background: '#0fe' }}>
        Col 2
      </Col>
    </Row>
  )),
);

stories.add(
  'With span',
  withInfo({ inline: true })(() => (
    <Row justifyContent='flex-end'>
      <Col style={{ background: '#06e', color: '#fff' }}>
        Col 1
      </Col>
      <Col span={12} style={{ background: '#0fe' }}>
        Col 2
      </Col>
    </Row>
  )),
);
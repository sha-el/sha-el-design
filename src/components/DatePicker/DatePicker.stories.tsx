import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DatePicker } from './DatePicker';
import { Row, Col } from '../Grid';

const stories = storiesOf('DatePicker', module);

stories.add(
  'Basic Date Picker',
  withInfo({ inline: true })(() => (
    <Row justifyContent='center'>
      <Col flex='0 1 300px'>
        <DatePicker
          date={[2020, 0, 2]}
        />
      </Col>
    </Row>
  )),
);

stories.add(
  'Disabled Date',
  withInfo({ inline: true })(() => (
    <Row justifyContent='center'>
      <Col flex='0 1 400px'>
        <DatePicker
          date={[2020, 0, 2]}
          disabledDate={([year, month, day]) => day > 5 && day < 25}
        />
      </Col>
    </Row>
  )),
);

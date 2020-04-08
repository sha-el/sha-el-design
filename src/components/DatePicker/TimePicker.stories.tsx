import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TimePicker, TimeTupple } from './TimePicker';
import { Row, Col } from '../Grid';

const stories = storiesOf('TimePicker', module);

stories.add(
  'Basic Time Picker',
  withInfo({ inline: true })(() => {
    const [time, update] = React.useState<TimeTupple>();
    return (
      <Row justifyContent='center'>
        <Col flex='0 1 320px'>
          <TimePicker
            time={time}
            onChange={(t) => {update(t); console.log(t);}}
          />
        </Col>
      </Row>
    );
  }),
);

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Card, CardHeader, CardBody, CardMedia, Button } from '../..';
import { Col, Row } from '../Grid';
import { IoMdOptions } from 'react-icons/io';

const stories = storiesOf('Card', module);

stories.add(
  'Basic',
  withInfo()(() => (
    <Row justifyContent='center'>
      <Col flex='0 1 400px'>
        <Card>
          <CardHeader subtitle='Do you Know Lorem Ipsum?'>Lorem Ipsum</CardHeader>
          <CardBody>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </CardBody>
        </Card>
      </Col>
    </Row>
  )),
);

stories.add(
  'With CardMedia',
  withInfo()(() => (
    <Row justifyContent='center'>
      <Col flex='0 1 400px'>
        <Card>
          <CardMedia
            height='300px'
            image='https://placeholder.com/wp-content/uploads/2019/06/lorem-ipsum.png'
          />
          <CardHeader subtitle='Do you Know Lorem Ipsum?'>Lorem Ipsum</CardHeader>
          <CardBody>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </CardBody>
        </Card>
      </Col>
      <Col flex='0 1 400px'>
        <Card>
          <CardHeader
            subtitle='Do you Know Lorem Ipsum?'
            action={<Button flat icon={<IoMdOptions />} />}
          >
            Lorem Ipsum
          </CardHeader>
          <CardMedia
            height='300px'
            image='https://placeholder.com/wp-content/uploads/2019/06/lorem-ipsum.png'
          />
          <CardBody>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </CardBody>
        </Card>
      </Col>
    </Row>
  )),
);
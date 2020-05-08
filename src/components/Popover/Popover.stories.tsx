import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Popover } from './Popover';
import { Button } from '../Button';
import { Row, Col } from '../Grid';

const stories = storiesOf('Popover', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => {
    return (
      <Popover
        content={
          <h1>Hello</h1>
        }
      >
        <Button>Hello</Button>
      </Popover>
    );
  }),
);

stories.add(
  'Position',
  withInfo({ inline: true })(() => {
    return (
      <>
        <Row justifyContent='center'>
          <Col span={8}>
            <Popover
              position='topLeft'
              content={
                <span>Hello</span>
              }
            >
              <Button>Top left</Button>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='top'
              content={
                <span>Hello</span>
              }
            >
              <Button>Top</Button>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='topRight'
              content={
                <span>Hello</span>
              }
            >
              <Button>Top Right</Button>
            </Popover>
          </Col>
        </Row>
        <Row justifyContent='center'>
          <Col span={8}>
            <Popover
              position='left'
              content={
                <span>Hello</span>
              }
            >
              <Button>left</Button>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='right'
              content={
                <span>Hello</span>
              }
            >
              <Button>Right</Button>
            </Popover>
          </Col>
        </Row>
        <Row justifyContent='center'>
          <Col span={8}>
            <Popover
              position='bottomLeft'
              content={
                <span>Hello</span>
              }
            >
              <Button>Bottom Left</Button>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='bottom'
              content={
                <span>Hello</span>
              }
            >
              <Button>Bottom</Button>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='bottomRight'
              content={
                <span>Hello</span>
              }
            >
              <Button>Bottom Right</Button>
            </Popover>
          </Col>
        </Row>
      </>
    );
  }),
);

stories.add(
  'Triggers',
  withInfo({ inline: true })(() => {
    return (
      <>
        <Popover
          trigger='onClick'
          content={
            <h1>Hello</h1>
          }
        >
          <Button>Click</Button>
        </Popover>
        <Popover
          trigger='onFocus'
          content={
            <h1>Hello</h1>
          }
        >
          <Button>Focus</Button>
        </Popover>
        <Popover
          trigger='onHover'
          content={
            <h1>Hello</h1>
          }
        >
          <Button>Hover</Button>
        </Popover>
      </>
    );
  }),
);

stories.add(
  'Hide arrow',
  withInfo({ inline: true })(() => {
    return (
      <Popover
        content={
          <h1>Hello</h1>
        }
        hideArrow
      >
        <Button>Hello</Button>
      </Popover>
    );
  }),
);

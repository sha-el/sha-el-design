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
        <span><Button>Hello</Button></span>
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
              <span><Button>Top left</Button></span>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='top'
              content={
                <span>Hello</span>
              }
            >
              <span><Button>Top</Button></span>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='topRight'
              content={
                <span>Hello</span>
              }
            >
              <span><Button>Top Right</Button></span>
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
              <span><Button>left</Button></span>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='right'
              content={
                <span>Hello</span>
              }
            >
              <span><Button>Right</Button></span>
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
              <span><Button>Bottom Left</Button></span>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='bottom'
              content={
                <span>Hello</span>
              }
            >
              <span><Button>Bottom</Button></span>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              position='bottomRight'
              content={
                <span>Hello</span>
              }
            >
              <span><Button>Bottom Right</Button></span>
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
          <span><Button>Click</Button></span>
        </Popover>
        <Popover
          trigger='onFocus'
          content={
            <h1>Hello</h1>
          }
        >
          <span><Button>Focus</Button></span>
        </Popover>
        <Popover
          trigger='onHover'
          content={
            <h1>Hello</h1>
          }
        >
          <span><Button>Hover</Button></span>
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
        <span><Button>Hello</Button></span>
      </Popover>
    );
  }),
);

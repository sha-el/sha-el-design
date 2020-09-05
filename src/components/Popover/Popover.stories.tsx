import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Popover, PopoverProps } from './Popover';
import { Button } from '../Button';
import { Row, Col } from '../Grid';

export default {
  title: 'Feedback/Popover',
  component: Popover,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<PopoverProps> = (args) => (
  <Popover {...args} content={<h1>Hello</h1>}>
    <Button>Hello</Button>
  </Popover>
);

export const Position: Story<PopoverProps> = (args) => (
  <>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover {...args} position="topLeft" content={<span>Hello</span>}>
          <Button>Top left</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover {...args} position="top" content={<span>Hello</span>}>
          <Button>Top</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover {...args} position="topRight" content={<span>Hello</span>}>
          <Button>Top Right</Button>
        </Popover>
      </Col>
    </Row>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover {...args} position="left" content={<span>Hello</span>}>
          <Button>left</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover {...args} position="right" content={<span>Hello</span>}>
          <Button>Right</Button>
        </Popover>
      </Col>
    </Row>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover {...args} position="bottomLeft" content={<span>Hello</span>}>
          <Button>Bottom Left</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover {...args} position="bottom" content={<span>Hello</span>}>
          <Button>Bottom</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover {...args} position="bottomRight" content={<span>Hello</span>}>
          <Button>Bottom Right</Button>
        </Popover>
      </Col>
    </Row>
  </>
);

export const Triggers: Story<PopoverProps> = (args) => (
  <>
    <Popover {...args} trigger="onClick" content={<h1>Hello</h1>}>
      <Button>Click</Button>
    </Popover>
    <Popover {...args} trigger="onFocus" content={<h1>Hello</h1>}>
      <Button>Focus</Button>
    </Popover>
    <Popover {...args} trigger="onHover" content={<h1>Hello</h1>}>
      <Button>Hover</Button>
    </Popover>
  </>
);

export const HideArrow: Story<PopoverProps> = (args) => (
  <Popover {...args} content={<h1>Hello</h1>} hideArrow>
    <Button>Hello</Button>
  </Popover>
);

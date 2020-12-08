import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Popover, PopoverProps } from './Popover';
import { Button } from '../Button';
import { Row, Col } from '../Grid';
import { Text } from '../Text';

export default {
  title: 'Feedback/Popover',
  component: Popover,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<PopoverProps> = (args) => (
  <Popover
    {...args}
    content={
      <Text margin="15px" variant="h4">
        Content
      </Text>
    }
  >
    <Button>Hello</Button>
  </Popover>
);

export const Position: Story<PopoverProps> = (args) => (
  <>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover
          {...args}
          position="topLeft"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Top left</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover
          {...args}
          position="top"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Top</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover
          {...args}
          position="topRight"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Top Right</Button>
        </Popover>
      </Col>
    </Row>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover
          {...args}
          position="left"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>left</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover
          {...args}
          position="right"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Right</Button>
        </Popover>
      </Col>
    </Row>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover
          {...args}
          position="bottomLeft"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Bottom Left</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover
          {...args}
          position="bottom"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Bottom</Button>
        </Popover>
      </Col>
      <Col span={8}>
        <Popover
          {...args}
          position="bottomRight"
          content={
            <Text margin="15px" variant="h4">
              Content
            </Text>
          }
        >
          <Button>Bottom Right</Button>
        </Popover>
      </Col>
    </Row>
  </>
);

export const Triggers: Story<PopoverProps> = (args) => (
  <>
    <Popover
      {...args}
      trigger="onClick"
      content={
        <Text margin="15px" variant="h4">
          Content
        </Text>
      }
    >
      <Button>Click</Button>
    </Popover>
    <Popover
      {...args}
      trigger="onFocus"
      content={
        <Text margin="15px" variant="h4">
          Content
        </Text>
      }
    >
      <Button>Focus</Button>
    </Popover>
    <Popover
      {...args}
      trigger="onHover"
      content={
        <Text margin="15px" variant="h4">
          Content
        </Text>
      }
    >
      <Button>Hover</Button>
    </Popover>
  </>
);

export const HideArrow: Story<PopoverProps> = (args) => (
  <Popover
    {...args}
    content={
      <Text margin="15px" variant="h4">
        Content
      </Text>
    }
    hideArrow
  >
    <Button>Hello</Button>
  </Popover>
);

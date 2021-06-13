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
    overlay={
      <Text margin="15px" variant="h4">
        Content
      </Text>
    }
  >
    <Button>Hello</Button>
  </Popover>
);

export const placement: Story<PopoverProps> = (args) => (
  <>
    <Row justifyContent="center">
      <Col span={8}>
        <Popover
          {...args}
          placement="left-start"
          overlay={
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
          placement="top"
          overlay={
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
          placement="right-start"
          overlay={
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
          placement="left"
          overlay={
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
          placement="right"
          overlay={
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
          placement="bottom-start"
          overlay={
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
          placement="bottom"
          overlay={
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
          placement="bottom-end"
          overlay={
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
      overlay={
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
      overlay={
        <Text margin="15px" variant="h4">
          Content
        </Text>
      }
    >
      <Button>Focus</Button>
    </Popover>
    <Popover
      {...args}
      trigger="onMouseOver"
      overlay={
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
    overlay={
      <Text margin="15px" variant="h4">
        Content
      </Text>
    }
    hideArrow
  >
    <Button>Hello</Button>
  </Popover>
);

export const Nested: Story<PopoverProps> = (args) => (
  <Popover
    {...args}
    overlay={
      <Popover
        {...args}
        overlay={
          <Text margin="15px" variant="h4">
            Content
          </Text>
        }
      >
        <Button>Hello</Button>
      </Popover>
    }
  >
    <Button>Hello</Button>
  </Popover>
);

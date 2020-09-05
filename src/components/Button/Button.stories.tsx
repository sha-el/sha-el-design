import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, AnchorButtonProps, NativeButtonProps } from './Button';
import { ButtonGroup } from '.';
import { MdEmail, MdFilter } from 'react-icons/md';

export default {
  title: 'Inputs/Button',
  component: Button,
  subcomponents: { ButtonGroup },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const BlockTemplate: Story<AnchorButtonProps & NativeButtonProps> = (args) => (
  <>
    <Button {...args}>Default</Button>
    <Button {...args} type="primary">
      Primary
    </Button>
    <Button {...args} type="secondary">
      Secondary
    </Button>
    <Button {...args} type="danger">
      Danger
    </Button>
    <Button {...args} type="link">
      Link
    </Button>
  </>
);

const CircleTemplate: Story<AnchorButtonProps & NativeButtonProps> = (args) => (
  <>
    <Button {...args} shape="circle" />
    <Button {...args} type="primary" shape="circle" />
    <Button {...args} type="secondary" shape="circle" />
    <Button {...args} type="danger" shape="circle" />
    <Button {...args} type="link" shape="circle" />
  </>
);

export const Type = BlockTemplate.bind({});

export const FlatButtons = BlockTemplate.bind({});
FlatButtons.args = {
  flat: true,
};

export const Icons = BlockTemplate.bind({});
Icons.args = {
  icon: <MdEmail />,
};

export const Circle = CircleTemplate.bind({});
Circle.args = {
  icon: <MdFilter />,
};

export const Disabled = BlockTemplate.bind({});
Disabled.args = {
  disabled: true,
};

export const Block = BlockTemplate.bind({});
Block.args = {
  displayBlock: true,
};

export const Loading = BlockTemplate.bind({});
Loading.args = {
  loading: true,
};

export const Group = () => (
  <ButtonGroup>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="secondary">Secondary</Button>
    <Button type="danger">Danger</Button>
  </ButtonGroup>
);

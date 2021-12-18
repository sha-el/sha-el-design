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
    <Button {...args} primary>
      Primary
    </Button>
    <Button {...args} secondary>
      Secondary
    </Button>
    <Button {...args} danger>
      Danger
    </Button>
    <Button {...args} link>
      Link
    </Button>
  </>
);

const MixedTemplate: Story<AnchorButtonProps & NativeButtonProps> = (args) => (
  <>
    <Button {...args}>Default</Button>
    <Button {...args} primary>
      Primary
    </Button>
    <Button {...args} outline secondary>
      Secondary
    </Button>
    <Button {...args} flat danger>
      Danger
    </Button>
    <Button {...args} link>
      Link
    </Button>
  </>
);

const CircleTemplate: Story<AnchorButtonProps & NativeButtonProps> = (args) => (
  <>
    <Button {...args} shape="circle" />
    <Button {...args} primary shape="circle" />
    <Button {...args} secondary outline shape="circle" />
    <Button {...args} secondary flat shape="circle" />
    <Button {...args} danger disabled shape="circle" />
    <Button {...args} link shape="circle" />
  </>
);

export const Type = BlockTemplate.bind({});

export const FlatButtons = BlockTemplate.bind({});
FlatButtons.args = {
  flat: true,
};

export const OutlineButtons = BlockTemplate.bind({});
OutlineButtons.args = {
  outline: true,
};

export const Icons = BlockTemplate.bind({});
Icons.args = {
  icon: <MdEmail />,
};

export const Circle = CircleTemplate.bind({});
Circle.args = {
  icon: <MdFilter />,
};

export const Disabled = MixedTemplate.bind({});
Disabled.args = {
  disabled: true,
};

export const Block = MixedTemplate.bind({});
Block.args = {
  displayBlock: true,
};

export const Loading = MixedTemplate.bind({});
Loading.args = {
  type: 'submit',
  loading: true,
};

export const Size = MixedTemplate.bind({});
Size.args = {
  size: 'big',
};

export const Group = () => (
  <ButtonGroup>
    <Button>Default</Button>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
    <Button danger>Danger</Button>
  </ButtonGroup>
);

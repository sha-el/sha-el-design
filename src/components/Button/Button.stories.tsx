import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonProps, Button } from './Button';
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

const Template: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} primary>
      Primary
    </Button>
    <Button {...args} secondary>
      Secondary
    </Button>
    <Button {...args} tertiary>
      Tertiary
    </Button>
    <Button {...args} error>
      error
    </Button>
  </>
);

export const Elevated: Story<ButtonProps> = Template.bind({});
Elevated.args = {
  elevated: true,
};

export const Filled: Story<ButtonProps> = Template.bind({});
Filled.args = {
  filled: true,
};

export const FilledTonal: Story<ButtonProps> = Template.bind({});
FilledTonal.args = {
  filledTonal: true,
};

export const Outlined: Story<ButtonProps> = Template.bind({});
Outlined.args = {
  outlined: true,
};

export const Text: Story<ButtonProps> = Template.bind({});
Text.args = {
  text: true,
};

export const Icon: Story<ButtonProps> = Template.bind({});
Icon.args = {
  filled: true,
  icon: <MdEmail />,
};

export const IconAfter: Story<ButtonProps> = Template.bind({});
IconAfter.args = {
  elevated: true,
  iconAfter: <MdFilter />,
};

export const Disabled: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} primary elevated>
      Elevated
    </Button>
    <Button {...args} primary filled>
      Filled
    </Button>
    <Button {...args} primary filledTonal>
      Filled Tonal
    </Button>
    <Button {...args} primary outlined>
      Outlined
    </Button>
    <Button {...args} primary text>
      Text
    </Button>
  </>
);
Disabled.args = {
  disabled: true,
};

export const Loading: Story<ButtonProps> = Disabled.bind({});
Loading.args = {
  loading: 'Doing Maths',
};

// const MixedTemplate: Story<ButtonProps> = (args) => (
//   <>
//     <Button {...args}>Default</Button>
//     <Button {...args} primary>
//       Primary
//     </Button>
//     <Button {...args} outline secondary>
//       Secondary
//     </Button>
//     <Button {...args} flat danger>
//       Danger
//     </Button>
//     <Button {...args} link>
//       Link
//     </Button>
//   </>
// );

// const CircleTemplate: Story<ButtonProps> = (args) => (
//   <>
//     <Button {...args} shape="circle" />
//     <Button {...args} primary shape="circle" />
//     <Button {...args} secondary outline shape="circle" />
//     <Button {...args} secondary flat shape="circle" />
//     <Button {...args} danger disabled shape="circle" />
//     <Button {...args} link shape="circle" />
//   </>
// );

// export const Type = BlockTemplate.bind({});

// export const FlatButtons = BlockTemplate.bind({});
// FlatButtons.args = {
//   flat: true,
// };

// export const OutlineButtons = BlockTemplate.bind({});
// OutlineButtons.args = {
//   outline: true,
// };

// export const Icons = BlockTemplate.bind({});
// Icons.args = {
//   icon: <MdEmail />,
// };

// export const Circle = CircleTemplate.bind({});
// Circle.args = {
//   icon: <MdFilter />,
// };

// export const Disabled = MixedTemplate.bind({});
// Disabled.args = {
//   disabled: true,
// };

// export const Block = MixedTemplate.bind({});
// Block.args = {
//   displayBlock: true,
// };

// export const Loading = MixedTemplate.bind({});
// Loading.args = {
//   type: 'submit',
//   loading: true,
// };

// export const Size = MixedTemplate.bind({});
// Size.args = {
//   size: 'big',
// };

// export const Group = () => (
//   <ButtonGroup>
//     <Button>Default</Button>
//     <Button primary>Primary</Button>
//     <Button secondary>Secondary</Button>
//     <Button danger>Danger</Button>
//   </ButtonGroup>
// );

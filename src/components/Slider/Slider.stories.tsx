import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Slider, SliderProps } from './Slider';

export default {
  title: 'Inputs/Slider',
  component: Slider,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<SliderProps> = (args) => <Slider {...args} />;
Basic.args = {
  value: 50,
};

export const MaxAndMin = Basic.bind({});
MaxAndMin.args = {
  min: 20,
  max: 80,
};

// export const Verticle: Story<SliderProps> = (args) => (
//   <div style={{ height: '400px' }}>
//     <Slider vertical {...args} />
//   </div>
// );

// export const Range: Story<RangeProps> = (args) => <SlRange {...args} />;

// export const Marks = Basic.bind({});
// Marks.args = {
//   marks: {
//     0: '0 KM',
//     10: '10 KM',
//     50: <Text color="red">50</Text>,
//     100: '100 KM',
//   },
// };

// export const WithTooltip: Story<SliderProps> = (args) => {
//   const handle = ({ value, dragging, ...rest }: { value: number; dragging?: boolean }) => (
//     <SliderTooltip visible={dragging} prefixCls="rc-slider-tooltip" overlay={`${value} KM`} placement="top">
//       <SliderHandle value={value} {...rest} />
//     </SliderTooltip>
//   );
//   return <Slider {...args} handle={handle} />;
// };

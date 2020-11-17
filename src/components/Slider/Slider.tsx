import React from 'react';
import RcSlider, { Range as RcRange, Handle, SliderTooltip } from 'rc-slider';
import { ThemeConsumer } from '../Theme/Theme';
import { rcSliderStyle } from './style';
import { RangeProps } from 'rc-slider/lib/Range';
import { SliderProps } from 'rc-slider/lib/Slider';
import { HandleProps } from 'rc-slider/lib/Handle';

export const Slider: React.FC<SliderProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => {
        rcSliderStyle(theme);
        return <RcSlider {...props} />;
      }}
    </ThemeConsumer>
  );
};

export const Range: React.FC<RangeProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => {
        rcSliderStyle(theme);
        return <RcRange {...props} />;
      }}
    </ThemeConsumer>
  );
};

export { RangeProps, SliderProps, HandleProps, Handle, SliderTooltip };

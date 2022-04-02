import React from 'react';
import { Global, css } from '@emotion/react';
import RcSlider, { Range as RcRange, Handle, SliderTooltip } from 'rc-slider';
import { rcSliderStyle } from './style';
import { RangeProps } from 'rc-slider/lib/Range';
import { SliderProps } from 'rc-slider/lib/Slider';
import { HandleProps } from 'rc-slider/lib/Handle';

export const Slider: React.FC<SliderProps> = (props) => {
  rcSliderStyle();

  return (
    <>
      <Global styles={css(rcSliderStyle())} />
      <RcSlider {...props} />
    </>
  );
};

export const Range: React.FC<RangeProps> = (props) => {
  rcSliderStyle();

  return (
    <>
      <Global styles={css(rcSliderStyle())} />
      <RcRange {...props} />
    </>
  );
};

export { RangeProps, SliderProps, HandleProps, Handle as SliderHandle, SliderTooltip };

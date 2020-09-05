import React from 'react';
import RcSlider from 'rc-slider';
import { ThemeConsumer } from '../Theme/Theme';
import { rcSliderStyle } from './style';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onBeforeChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  vertical?: boolean;
  included?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  minimumTrackStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  tabIndex?: number;
  ariaLabelForHandle?: string;
  ariaLabelledByForHandle?: string;
  ariaValueTextFormatterForHandle?: string;
  startPoint?: number;
  handle?: (props: {
    className: string;
    prefixCls?: string;
    vertical?: boolean;
    offset: number;
    value: number;
    dragging?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    reverse?: boolean;
    index: number;
    tabIndex?: number;
    ariaLabel: string;
    ariaLabelledBy: string;
    ariaValueTextFormatter: string;
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLElement>;
  }) => React.ReactElement;
}

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

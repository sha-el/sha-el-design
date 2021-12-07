import React, { useRef, useState } from 'react';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { marginCss } from '../../helpers/margin';
import { paddingCss } from '../../helpers/padding';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Slider: React.FC<SliderProps> = (props) => {
  const theme = useTheme();
  const railRef = useRef<HTMLDivElement>();
  const handleRef = useRef<HTMLDivElement>();

  const { min = 0, max = 100 } = props;
  const [value, updateValue] = useState(props.value || min);

  const [dragActive, updateDragActive] = useState(false);
  const css = style(theme, dragActive);

  const computeValue = (value: number) => {
    // console.log(value);
    // return (value * (max - min)) / 100;
    return value;
  };

  const handleOnRailClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = railRef.current?.getBoundingClientRect();
    let value = 0;
    if (e.type === 'touchstart') {
      value = (((e as React.TouchEvent).touches[0].clientX - rect.left) * 100) / rect.width;
    } else {
      value = (((e as React.MouseEvent).clientX - rect.left) * 100) / rect.width;
    }
    value = computeValue(value);
    if (value >= min && value <= max) {
      props.onChange(value);
      updateValue(value);
    }
    updateDragActive(true);

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);
  };

  const dragEnd = () => {
    updateDragActive(false);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', dragEnd);
  };

  const drag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const rect = railRef.current?.getBoundingClientRect();

    let value = 0;
    if (e.type === 'touchstart') {
      value = (((e as TouchEvent).touches[0].clientX - rect.left) * 100) / rect.width;
    } else {
      value = (((e as MouseEvent).clientX - rect.left) * 100) / rect.width;
    }

    value = computeValue(value);

    if (value >= min && value <= max) {
      props.onChange(value);
      updateValue(value);
    }
  };

  return (
    <div
      className={classes('sha-el-slider', css.slider, marginCss(2))}
      onTouchStart={handleOnRailClick}
      onMouseDown={handleOnRailClick}
    >
      <div className={classes('sha-el-slider-rail')} ref={railRef} />
      <div className={classes('sha-el-slider-track')} style={{ width: value + '%' }} />
      <div className={classes('sha-el-slider-handle')} style={{ left: value + '%' }} ref={handleRef} />
      <div
        className={classes('sha-el-slider-tooltip', elevationCss(4), paddingCss([5, 0]))}
        style={{ left: `calc(${value}% - 20px)` }}
      >
        {value}
      </div>
    </div>
  );
};

export interface SliderProps {
  /**
   * Value of slider.
   */
  value?: number;
  /**
   * onChange event handler.
   */
  onChange?: (value: number) => void;
  /**
   * Min value of slider.
   */
  min?: number;
  /**
   * Max value of slider.
   */
  max?: number;
}

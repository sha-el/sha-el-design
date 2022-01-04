import React, { useRef } from 'react';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { Text } from '../Text';
import { Theme, useTheme } from '../Theme/Theme';
import { style } from './style';

export interface SwitchProps {
  /**
   * Determine whether switch is checked or not
   */
  checked?: boolean;

  /**
   * Initial state
   */
  defaultChecked?: boolean;

  /**
   * onChange event handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The Size of switch
   */
  size?: 'small' | 'default';

  /**
   * Disables the switch
   */
  disabled?: boolean;

  /**
   * css Class name
   */
  className?: string;

  /**
   * One of the theme colors or any string eg rbg(0,0,0) or #ff6600
   */
  color?: keyof Theme | string;

  /**
   * Label for Switch
   */
  label?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const theme = useTheme();
  const css = style(props, theme);
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (props.disabled) {
      return;
    }
    inputRef?.current?.click();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      handleClick(e);
    }
  };

  return (
    <div
      tabIndex={0}
      className={classes('sha-el-switch', css.container)}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      <input
        defaultChecked={props.defaultChecked}
        checked={props.checked}
        onChange={props.onChange}
        ref={inputRef}
        type="checkbox"
        className={css.input}
      />
      <span className={css.track} />
      <span className={classes(css.thumb, elevationCss(4))} />
      <span className={classes(css.thumbContainer, 'sha-el-switch-thumb-container')} />
      {props.label && (
        <Text variant="label" margin="0 10px">
          {props.label}
        </Text>
      )}
    </div>
  );
};

Switch.defaultProps = {
  color: 'primary',
};

import React from 'react';
import { classes } from '../../helpers';
import { paddingCss, PaddingValue } from '../../helpers/padding';
import { Loading } from '../Loading';
import { buttonStyle, buttonTypeStyle } from './style';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  elevated?: boolean;
  filled?: boolean;
  filledTonal?: boolean;
  outlined?: boolean;
  text?: boolean;
  // fab?: boolean;
  // extendedFab?: boolean;

  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  error?: boolean;
  disabled?: boolean;

  padding?: PaddingValue;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;

  displayBlock?: boolean;

  /**
   * Shows a loading icon inside button.
   * Uses string as button's contnet while loading
   */
  loading?: boolean | string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    elevated: __elevated,
    filled: __filled,
    filledTonal: __filledTonal,
    outlined: __outlined,
    text: __text,
    // fab: __fab,
    // extendedFab: __extendedFab,
    primary: __primary,
    secondary: __secondary,
    tertiary: __tertiary,
    error: __error,
    icon,
    iconAfter,
    displayBlock,
    className,
    padding = [0, 30],
    ...rest
  } = props;

  return (
    <button
      {...rest}
      style={{ ...props.style, width: displayBlock && '100%' }}
      className={classes(className, buttonStyle, buttonTypeStyle(props), paddingCss(padding))}
    >
      {props.loading ? (
        <>
          <Loading isLoading size="small" /> <span style={{ marginLeft: '10px' }}>{props.loading}</span>
        </>
      ) : (
        <>
          {icon && <span style={{ marginRight: props.children && '10px' }}>{icon}</span>}
          {props.children}
          {iconAfter && <span style={{ marginLeft: props.children && '10px' }}>{iconAfter}</span>}
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  text: true,
  style: {},
};

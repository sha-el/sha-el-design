import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { buttonColor } from '../../helpers/color';
import { Loading } from '../Loading';
import { Text } from '../Text';
import { classes } from '../../helpers';
import { shapeTypes, sizeTypes, style } from './style';
import { PaddingClassNameInput, paddingCss } from '../../helpers/padding';

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    size: __size,
    shape: __shape,
    displayBlock: __displayBlock,
    icon,
    flat: __flat,
    className,
    loading,
    component,
    onClick,
    outline: __outline,
    primary,
    secondary,
    danger,
    link,
    padding,
    ...rest
  } = props;

  const BaseElement = (
    p: React.AnchorHTMLAttributes<HTMLAnchorElement> | React.ButtonHTMLAttributes<HTMLButtonElement>,
  ) => {
    if (component) {
      return React.cloneElement(props.component, p);
    }
    if (rest.href !== undefined || link) {
      return React.cloneElement(<a {...(p as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />);
    }

    return React.cloneElement(<button {...(p as React.ButtonHTMLAttributes<HTMLButtonElement>)} />);
  };

  const theme = useTheme();
  const css = style(theme, props);

  if (rest.href !== undefined || link) {
    return (
      <BaseElement
        className={classes(css.anchor, css.default, className, paddingCss(padding))}
        onClick={(
          e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => !loading && onClick && onClick(e)}
        {...rest}
      >
        {icon}
        <Loading
          color={buttonColor(props, theme, primary, secondary, danger, link)[1]}
          isLoading={loading}
          size="small"
          render={() => <span>{props.children}</span>}
        />
      </BaseElement>
    );
  }

  const buttonProps = rest as NativeButtonProps;
  return (
    <BaseElement
      className={classes(css.default, css.button, className, paddingCss(padding))}
      onClick={(e) => !loading && onClick && onClick(e)}
      {...buttonProps}
    >
      {icon}
      <Loading
        style={{ margin: '0' }}
        color={buttonColor(props, theme, primary, secondary, danger, link)[1]}
        isLoading={loading}
        size="small"
        render={() => <span>{props.children}</span>}
      />
      {loading && <Text margin="0 10px">Loading</Text>}
    </BaseElement>
  );
};

Button.defaultProps = {
  size: 'default',
  shape: 'default',
  type: 'button',
};

export interface BaseButtonProps {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  link?: boolean;

  size?: sizeTypes;
  shape?: shapeTypes;
  className?: string;
  displayBlock?: boolean;
  flat?: boolean;
  outline?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  component?: React.ReactElement;

  // For anchor tag
  href?: string;
  target?: string;
  disabled?: boolean;

  padding?: PaddingClassNameInput;
}

export type AnchorButtonProps = {
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  link?: false;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

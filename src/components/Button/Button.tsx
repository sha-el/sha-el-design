import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { buttonColor } from '../../helpers/color';
import { Loading } from '../Loading';
import { Text } from '../Text';
import { classes } from '../../helpers';
import { shapeTypes, sizeTypes, style } from './style';
import { PaddingClassNameInput, paddingCss } from '../../helpers/padding';

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>((props, ref) => {
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
    type,
    ...rest
  } = props;

  const theme = useTheme();
  const css = style(theme, props);

  const buttonProps = rest as NativeButtonProps;
  const anchorProps = rest as AnchorButtonProps;

  if (component) {
    const Element = (p: Record<string, unknown>) => React.cloneElement(props.component, p);

    if (link || props.href !== undefined) {
      return (
        <Element
          className={classes(css.anchor, css.default, className, paddingCss(padding))}
          onClick={(
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ) => !loading && onClick && onClick(e)}
          {...anchorProps}
        >
          {icon}
          <Loading
            color={buttonColor(props, theme, primary, secondary, danger, link)[1]}
            isLoading={loading}
            size="small"
            render={() => <span>{props.children}</span>}
          />
        </Element>
      );
    }

    return (
      <Element
        className={classes(css.default, css.button, className, paddingCss(padding))}
        onClick={(
          e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => !loading && onClick && onClick(e)}
        ref={ref}
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
      </Element>
    );
  }

  if (link) {
    return (
      <a
        className={classes(css.anchor, css.default, className, paddingCss(padding))}
        onClick={(
          e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => !loading && onClick && onClick(e)}
        ref={ref}
        {...anchorProps}
      >
        {icon}
        <Loading
          color={buttonColor(props, theme, primary, secondary, danger, link)[1]}
          isLoading={loading}
          size="small"
          render={() => <span>{props.children}</span>}
        />
      </a>
    );
  }

  return (
    <button
      className={classes(css.default, css.button, className, paddingCss(padding))}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        !loading && onClick && onClick(e)
      }
      ref={ref}
      type={loading ? 'button' : (type as 'button')}
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
    </button>
  );
});

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

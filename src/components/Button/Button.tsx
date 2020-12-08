import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { buttonColor } from '../../helpers/color';
import { Loading } from '../Loading';
import { Text } from '../Text';

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
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

  if (rest.href !== undefined || link) {
    return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(props, theme);
          return (
            <BaseElement
              className={classes(css.anchor, css.default, className)}
              onClick={(e) => !loading && onClick && onClick(e)}
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
        }}
      </ThemeConsumer>
    );
  }

  const buttonProps = rest as NativeButtonProps;
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(props, theme);
        return (
          <BaseElement
            className={classes(css.default, css.button, className)}
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
      }}
    </ThemeConsumer>
  );
};

Button.defaultProps = {
  size: 'default',
  shape: 'default',
};

function getSize(size: sizeTypes, shape: shapeTypes, block: boolean, flat: boolean) {
  let buttonStyles = {
    padding: `0 ${flat ? 5 : 20}px`,
    height: '36px',
    fontSize: '14px',
    width: block ? '100%' : 'auto',
    borderRadius: '4px',
    lineHeight: '36px',
  };
  switch (size) {
    case 'big': {
      buttonStyles = {
        ...buttonStyles,
        padding: `0 ${flat ? 5 : 30}px`,
        height: '40px',
        fontSize: '16px',
      };
      break;
    }
    case 'small': {
      buttonStyles = {
        ...buttonStyles,
        padding: `0 ${flat ? 5 : 20}px`,
        height: '30px',
        fontSize: '12px',
      };
    }
  }
  if (shape === 'circle') {
    buttonStyles.width = buttonStyles.height;
    buttonStyles.borderRadius = '50%';
    buttonStyles.padding = '0px';
    buttonStyles.lineHeight = Number(buttonStyles.height.replace('px', '')) + 5 + 'px';
  }
  return buttonStyles;
}

export function style(props: ButtonProps, theme: Theme) {
  const { disabled, children, primary, secondary, danger, link } = props;

  const [bgColor, textColor, hoverBgColor, border] = buttonColor(props, theme, primary, secondary, danger, link);

  return stylesheet({
    default: {
      ...getSize(props.size, props.shape, props.displayBlock, props.flat),
      display: 'inline-flex',
      alignItems: 'center',
      justifyItems: 'center',
      border,
      cursor: props.loading ? 'wait' : 'pointer',
      textDecoration: 'none',
      boxSizing: 'border-box',
      letterSpacing: '.0892857143em',
      fontWeight: 500,
      textAlign: 'center',
      justifyContent: 'center',
      background: bgColor,
      whiteSpace: 'nowrap',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      $nest: {
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          transform: 'translate(0, 2px)',
        },
        '&:disabled': {
          background: bgColor,
          cursor: 'not-allowed',
          color: textColor,
        },
        svg: {
          display: 'inline-block',
          verticalAlign: 'middle',
          fontSize: '20px',
          marginLeft: children && '-4px',
          marginRight: children && '8px',
        },
      },
    },
    button: {
      boxShadow:
        props.flat || props.outline
          ? 'none'
          : '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
      textAlign: 'center',
      color: textColor,
      $nest: {
        '&:hover':
          (!disabled && {
            background: hoverBgColor,
            color: textColor,
          }) ||
          undefined,
      },
    },
    anchor: {
      color: textColor,
      textAlign: 'left',
      cursor: 'pointer',
      $nest: {
        '&[disabled]': {
          cursor: 'not-allowed',
        },
      },
    },
  });
}

declare type sizeTypes = 'default' | 'big' | 'small';
declare type shapeTypes = 'default' | 'circle';

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

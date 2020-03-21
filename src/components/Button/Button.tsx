import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { Theme, ThemeService } from '../../helpers/theme';
import { getColor, removeObjectProperties } from '../../helpers';
import { styleEnum } from '../../helpers/constants';
import { color } from 'csx';

export class Button extends React.Component<ButtonProps, State> {
  css = css.bind(this);
  private readonly theme = new ThemeService();

  static defaultProps = {
    type: 'default',
    size: 'default',
    shape: 'default',
  };

  constructor(props: ButtonProps) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
    };
  }

  render() {
    const style = this.css();
    const {
      type,
      size,
      shape,
      displayBlock,
      icon,
      flat,
      className,
      ...rest
    } = this.props;

    const linkButtonRestProps = removeObjectProperties(rest as AnchorButtonProps, 'type');
    if (rest.href !== undefined || type === 'link') {
      return (
        <a
          className={classes(style.anchor, style.default, className)}
          {...linkButtonRestProps}
        >
          {icon}
          {this.props.children}
        </a>
      );
    }

    const buttonProps = rest as NativeButtonProps;
    return (
      <button
        className={classes(style.default, style.button, className)}
        {...buttonProps}
      >
        {icon}
        {this.props.children}
      </button>
    );
  }
}

function getSize(size: sizeTypes, shape: shapeTypes, block: boolean) {
  let style = {
    padding: '0 20px',
    height: '36px',
    fontSize: '14px',
    width: block ? '100%' : 'auto',
    borderRadius: '4px',
    lineHeight: '36px',
  };
  switch (size) {
    case 'big': {
      style = {
        ...style,
        padding: '0 30px',
        height: '40px',
        fontSize: '16px',
      };
    }
  }
  if (shape === 'circle') {
    style.width = style.height;
    style.borderRadius = '50%';
    style.padding = '0px';
    style.lineHeight = (Number(
      style.height.replace('px', ''),
    ) + 5) + 'px';
  }
  return style;
}

function buttonColor(props: ButtonProps, theme: Theme): [string, string] {
  if (props.disabled && (props.type !== 'link' && !props.flat)) {
    return [styleEnum.disabledColor, '#ffffff'];
  }

  if (props.disabled) {
    return ['rgba(255,255,255,0)', styleEnum.disabledColor];
  }

  if (props.type === 'link') {
    return ['rgba(255,255,255,0)', theme.primary];
  }
  if (props.flat) {
    return ['rgba(255,255,255,0)', props.type === 'default' ? '#000000' : theme[props.type]];
  }

  const bgColor = {
    ...theme,
    default: '#eeeeee',
  }[props.type];

  return [bgColor, getColor(bgColor)];
}

function css() {
  const { disabled, children } = this.props;

  const [bgColor, textColor] = buttonColor(this.props, this.state.theme);

  const hoverBgColor = color(bgColor).darken(.1).toHexString();
  return stylesheet({
    default: {
      ...getSize(this.props.size, this.props.shape, this.props.displayBlock),
      display: 'inline-flex',
      alignItems: 'center',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      boxSizing: 'border-box',
      letterSpacing: '.0892857143em',
      fontWeight: 500,
      textAlign: 'center',
      justifyContent: 'center',
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
        'svg': {
          display: 'inline-block',
          verticalAlign: 'middle',
          fontSize: '17px',
          marginLeft: children && '-4px',
          marginRight: children && '8px',
        },
      },
    },
    button: {
      boxShadow: this.props.flat ? 'none' : '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
      textAlign: 'center',
      background: bgColor,
      color: textColor,
      $nest: {
        '&:hover': !disabled && {
          background: hoverBgColor,
          color: textColor,
        },
      },
    },
    anchor: {
      color: textColor,
      background: bgColor,
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

declare type sizeTypes = 'default' | 'big';
declare type shapeTypes = 'default' | 'circle';

export interface BaseButtonProps {
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'link';
  size?: sizeTypes;
  shape?: shapeTypes;
  className?: string;
  displayBlock?: boolean;
  flat?: boolean;
  icon?: React.ReactNode;

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
  link?: false,
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

interface State {
  theme: Theme;
}

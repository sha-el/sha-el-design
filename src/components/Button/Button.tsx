import * as React from 'react';
import { stylesheet } from 'typestyle';
import { Theme, ThemeService } from '../../helpers/theme';
import { getColor, removeObjectProperties } from '../../helpers';
import { styleEnum } from '../../helpers/constants';
import { color } from 'csx';
import { Ripple } from './Ripple';

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
      ...rest
    } = this.props;

    const linkButtonRestProps = removeObjectProperties(rest as AnchorButtonProps, 'type');
    if (rest.href !== undefined) {
      return (
        <a
          className={`${style.default} ${style.anchor}`}
          {...linkButtonRestProps}
        >
          {this.props.children}
        </a>
      );
    }

    const buttonProps = rest as NativeButtonProps;
    return (
      <button
        className={`${style.default} ${style.button}`}
        {...buttonProps}
      >
        {this.props.children}
      </button>
    );
  }
}

function getSize(size: sizeTypes, shape: shapeTypes) {
  let style = {
    padding: '0 20px',
    height: '34px',
    fontSize: '14px',
    width: 'auto',
    borderRadius: '2px',
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
    case 'fat': {
      style = {
        ...style,
        padding: '0 40px',
        height: '45px',
        fontSize: '18px',
      };
    }
  }
  if (shape === 'circle') {
    style.width = style.height;
    style.borderRadius = '50%';
    style.padding = '0px';
  }
  return style;
}

function css() {
  const baseColor = this.state.theme[this.props.type];
  const hoverBgColor = color(baseColor).darken(.1).toHexString();
  return stylesheet({
    default: {
      ...getSize(this.props.size, this.props.shape),
      display: 'block',
      textAlign: 'center',
      lineHeight: '30px',
      background: baseColor,
      color: getColor(baseColor),
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      margin: '0 0 10px 0',
      $nest: {
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          transform: 'translate(0, 2px)',
        },
      },
    },
    button: {
      boxShadow: '0 2px 0 rgba(0,0,0,0.045)',
      $nest: {
        '&:hover': {
          background: hoverBgColor,
          color: getColor(hoverBgColor),
        },
      },
    },
    anchor: {
      $nest: {
        '&:hover': {
          color: getColor(baseColor),
          fontWeight: 'bolder',
        },
      },
    },
  });
}

declare type sizeTypes = 'default' | 'big' | 'fat';
declare type shapeTypes = 'default' | 'circle';

export interface BaseButtonProps {
  type?: keyof Theme;
  size?: sizeTypes;
  shape?: shapeTypes;
  className?: string;

  // For anchor tag
  href?: string;
  target?: string;
}

export type AnchorButtonProps = {
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

interface State {
  theme: Theme;
}

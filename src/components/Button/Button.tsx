import * as React from 'react';
import { stylesheet } from 'typestyle';
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
      link,
      displayBlock,
      ...rest
    } = this.props;

    const linkButtonRestProps = removeObjectProperties(rest as AnchorButtonProps, 'type');
    if (rest.href !== undefined || link) {
      return (
        <a
          className={`${style.anchor} ${style.default}`}
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

function getSize(size: sizeTypes, shape: shapeTypes, block: boolean) {
  let style = {
    padding: '0 20px',
    height: '34px',
    fontSize: '14px',
    width: block ? '100%' : 'auto',
    borderRadius: '4px',
    lineHeight: '34px',
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
    style.lineHeight = (Number(
      style.height.replace('px', ''),
    ) + 5) + 'px';
  }
  return style;
}

function css() {
  const { disabled } = this.props;
  const baseColor = this.state.theme[this.props.type];
  const hoverBgColor = color(baseColor).darken(.1).toHexString();
  return stylesheet({
    default: {
      display: 'block',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      margin: '0 0 10px 0',
      boxSizing: 'border-box',
      $nest: {
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          transform: 'translate(0, 2px)',
        },
        '&:disabled': {
          background: styleEnum.borderColor,
          cursor: 'not-allowed',
          color: 'white',
        },
      },
    },
    button: {
      ...getSize(this.props.size, this.props.shape, this.props.displayBlock),
      boxShadow: '0 2px 0 rgba(0,0,0,0.045)',
      textAlign: 'center',
      background: baseColor,
      color: getColor(baseColor),
      $nest: {
        '&:hover': !disabled && {
          background: hoverBgColor,
          color: getColor(hoverBgColor),
        },
      },
    },
    anchor: {
      color: baseColor,
      background: 'white',
      textAlign: 'left',
      cursor: 'pointer',
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
  displayBlock?: boolean;
  link?: boolean;

  // For anchor tag
  href?: string;
  target?: string;
  disabled?: boolean;
}

export type AnchorButtonProps = {
  href?: string;
  target?: string;
  link?: true,
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

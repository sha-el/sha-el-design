import { Theme } from '../Theme/Theme';
import { buttonColor } from '../../helpers/color';
import { ButtonProps } from './Button--old';
import { css } from '@emotion/css';
import { shadow } from '../../helpers/style';

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

export const style = (theme: Theme, props: ButtonProps) => {
  const { children, primary, secondary, danger, link, disabled, flat, outline, loading } = props;
  const [bgColor, textColor, hoverBgColor, border] = buttonColor(props, theme, primary, secondary, danger, link);

  return {
    default: css({
      ...getSize(props.size, props.shape, props.displayBlock, props.flat),
      display: 'inline-flex',
      alignItems: 'center',
      justifyItems: 'center',
      border,
      cursor: props.loading ? 'wait' : 'pointer',
      textDecoration: 'none',
      boxSizing: 'border-box',
      letterSpacing: '1.25px',
      textTransform: 'uppercase',
      fontWeight: 500,
      textAlign: 'center',
      justifyContent: 'center',
      background: bgColor,
      whiteSpace: 'nowrap',
      transition: 'all .3s',
      '&:focus': {
        outline: 'none',
        boxShadow: shadow('2X', theme),
        ...((!(disabled || loading) && {
          background: hoverBgColor,
          color: textColor,
        }) ||
          {}),
      },
      '&:disabled': {
        background: bgColor,
        cursor: 'not-allowed',
        color: textColor,
      },
      '& svg': {
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: props.size === 'big' ? '20px' : props.size === 'small' ? '14px' : '16px',
        marginLeft: children && '-4px',
        marginRight: children && '8px',
      },
    }),
    button: css({
      boxShadow:
        flat || outline
          ? 'none'
          : '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
      textAlign: 'center',
      color: textColor,
      '&:hover':
        (!(disabled || loading) && {
          background: hoverBgColor,
          color: textColor,
        }) ||
        undefined,
      '&:active': {
        boxShadow: flat || outline ? 'none' : shadow('DEFAULT', theme),
        transform: 'scale(.98)',
      },
    }),
    anchor: css({
      color: textColor,
      textAlign: 'left',
      cursor: 'pointer',
      '&[disabled]': {
        cursor: 'not-allowed',
      },
    }),
  };
};

export const buttonGroupStyle = css({
  '& button': {
    borderRadius: '0',
    '&:first-child': {
      borderRadius: '5px 0 0 5px',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
  },
  '& a': {
    boxSizing: 'border-box',
    borderRadius: '0',
    '&:first-child': {
      borderRadius: '5px 0 0 5px',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
  },
  '& *:first-child': {
    '& button': {
      borderRadius: '5px 0 0 5px !important',
    },
  },
  '& *:last-child': {
    '& button': {
      borderRadius: '0 5px 5px 0 !important',
    },
  },
});

export type sizeTypes = 'default' | 'big' | 'small';
export type shapeTypes = 'default' | 'circle';

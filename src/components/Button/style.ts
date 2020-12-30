import { createUseStyles } from 'react-jss';
import { theming } from '../Theme/Theme';
import { buttonColor } from '../../helpers/color';

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

export const style = createUseStyles(
  {
    default: ({ theme, props }) => {
      const { children, primary, secondary, danger, link } = props;
      const [bgColor, textColor, , border] = buttonColor(props, theme, primary, secondary, danger, link);

      return {
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
        '& svg': {
          display: 'inline-block',
          verticalAlign: 'middle',
          fontSize: props.size === 'big' ? '20px' : props.size === 'small' ? '14px' : '16px',
          marginLeft: children && '-4px',
          marginRight: children && '8px',
        },
      };
    },
    button: ({ theme, props }) => {
      const { disabled, primary, secondary, danger, link } = props;
      const [, textColor, hoverBgColor, __] = buttonColor(props, theme, primary, secondary, danger, link);
      return {
        boxShadow:
          props.flat || props.outline
            ? 'none'
            : '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
        textAlign: 'center',
        color: textColor,
        '&:hover':
          (!disabled && {
            background: hoverBgColor,
            color: textColor,
          }) ||
          undefined,
      };
    },
    anchor: ({ theme, props }) => {
      const { primary, secondary, danger, link } = props;
      const [, textColor, , __] = buttonColor(props, theme, primary, secondary, danger, link);
      return {
        color: textColor,
        textAlign: 'left',
        cursor: 'pointer',
        '&[disabled]': {
          cursor: 'not-allowed',
        },
      };
    },
  },
  { theming, name: 'sha-el-button' },
);

export type sizeTypes = 'default' | 'big' | 'small';
export type shapeTypes = 'default' | 'circle';

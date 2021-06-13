import { lightText, borderColor as borderColorHelper, disabledText } from '../../helpers/color';
import { getColor } from '../../helpers/color';
import { css } from '@emotion/css';
import { zIndexBase } from '../../helpers/zIndex';

export const style = ({ theme, error, label, active, borderless, disabled, hover, before, required }) => {
  const borderColor = error ? theme.error : borderColorHelper(theme.background);

  const borderStyle = borderless
    ? {
        border: 'none',
        borderBottom: `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
        borderRadius: '0',
      }
    : {
        border: `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
        // borderTop: active && label ? 'none' : `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
        borderRadius: '4px',
      };
  return {
    container: css({
      position: 'relative',
      zIndex: zIndexBase,
      color: disabled ? disabledText(theme) : lightText(theme),
      fontSize: '14px',
      lineHeight: 1.12857,
      cursor: 'text',
      marginTop: '1px',
      marginBottom: '2px',
      transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      '&:focus-within': !error && {
        '& fieldset': {
          borderColor: theme.primary,
        },
        '& .seudo': {
          color: theme.primary,
        },
        '& .label': {
          color: theme.primary,
          '&:after, &:before': {
            borderColor: borderless ? 'transparent' : theme.primary,
          },
        },
      },
      '&:hover': hover && {
        '& fieldset': {
          borderColor: (!disabled && 'rgb(9, 30, 66)') || undefined,
        },
        '&.label': {
          color: !disabled ? lightText(theme) : undefined,
          '&:after, &:before': {
            borderColor: !disabled ? (borderless ? 'transparent' : 'rgb(9, 30, 66)') : undefined,
          },
        },
        '& .seudo': {
          color: 'rgb(9, 30, 66)',
        },
      },
    }),
    input: css({
      width: '100%',
      fontSize: '14px',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
      lineHeight: '12px',
      padding: `9px ${borderless ? '0' : before ? '5px' : '14px'}`,
      color: disabled ? disabledText(theme) : getColor(theme.background),
      boxSizing: 'border-box',
      height: '36px',
      '&::placeholder': {
        color: '#aaaaaa',
      },
      '&:disabled': {
        cursor: 'not-allowed',
      },
    }),
    textarea: css({
      fontSize: '14px',
      minWidth: '0px',
      width: '100%',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
      flex: '1 1 auto',
      lineHeight: '1em',
      padding: '8px 5px',
      maxWidth: '100%',
      color: disabled ? disabledText(theme) : lightText(theme),
      '&::placeholder': {
        color: '#aaaaaa',
      },
    }),
    label: css({
      position: 'absolute',
      color: disabled ? disabledText(theme) : error ? active && theme.error : lightText(theme),
      left: 0,
      top: 0,
      zIndex: 1,
      transform: active
        ? `translate(${borderless ? '0px' : '14px'}, -5px) scale(0.75)`
        : `translate(${borderless ? '0px' : '14px'}, 11.5px) scale(1)`,
      pointerEvents: 'none',
      transition: 'all 0.2s',
      transformOrigin: 'top left',
      display: 'block',
    }),
    fieldset: css({
      ...borderStyle,
      top: '-5px',
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: '0 8px',
      overflow: 'hidden',
      position: 'absolute',
      pointerEvents: 'none',
    }),
    legend: css({
      width: !label ? '0.01px' : 'auto',
      height: '11px',
      display: 'block',
      padding: 0,
      fontSize: '0.75em',
      maxWidth: active ? '1000px' : '0.01px',
      textAlign: 'left',
      transition: `max-width ${active ? '100ms' : '50ms'} cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
      visibility: 'hidden',
      '& span': {
        display: 'inline-block',
        paddingLeft: '5px',
        paddingRight: required ? '12px' : '5px',
      },
    }),
    help: css({
      width: '100%',
      fontSize: '.65rem',
      lineHeight: 1.5,
      marginTop: '1.5px',
    }),

    hint: css({
      color: '#aaaaaa',
    }),

    error: css({
      color: theme.error,
    }),

    seudo: css({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    }),
  };
};

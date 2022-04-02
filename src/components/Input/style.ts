import { css } from '@emotion/css';
import { zIndexBase } from '../../helpers/zIndex';
import { themeVar } from '../Theme/helper';

export const style = ({ error, label, active, borderless, disabled, hover, required, before, filled }) => {
  const borderColor = error ? themeVar.neutral.error.error : themeVar.neutral.neutralVariantKeyColor.outline;

  const borderStyle = borderless
    ? {
        border: 'none',
        borderBottom: `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
        borderRadius: '0',
      }
    : {
        border: `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
        borderRadius: '4px',
      };
  return {
    container: css({
      position: 'relative',
      zIndex: zIndexBase,
      color: disabled ? themeVar.neutral.error.disabled : themeVar.neutral.neutralVariantKeyColor.outline,
      fontSize: '14px',
      cursor: 'text',
      marginTop: '1px',
      background: filled && '#f5f5f5',
      marginBottom: '2px',
      transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      '&:focus-within': !error && {
        '& fieldset': {
          borderColor: themeVar.accent.primaryKeyColor.primary,
        },
        '& .seudo': {
          color: themeVar.accent.primaryKeyColor.primary,
        },
        '& .label': {
          color: themeVar.accent.primaryKeyColor.primary,
          '&:after, &:before': {
            borderColor: borderless ? 'transparent' : themeVar.accent.primaryKeyColor.primary,
          },
        },
      },
      '&:hover': hover && {
        '& fieldset': {
          borderColor: (!disabled && 'rgb(9, 30, 66)') || undefined,
        },
        '&.label': {
          color: !disabled ? themeVar.neutral.neutralVariantKeyColor.outline : undefined,
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
      padding: before ? '16px 12px' : '16px',
      color: disabled ? themeVar.neutral.error.disabled : themeVar.neutral.neutralKeyColor.onBackground,
      boxSizing: 'border-box',
      height: '47px',
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
      color: disabled ? themeVar.neutral.error.disabled : themeVar.neutral.neutralVariantKeyColor.outline,
      '&::placeholder': {
        color: '#aaaaaa',
      },
    }),
    label: css({
      position: 'absolute',
      color: disabled
        ? themeVar.neutral.error.disabled
        : error
        ? themeVar.neutral.error.error
        : themeVar.neutral.neutralKeyColor.onSurface,
      left: 0,
      top: 0,
      zIndex: 1,
      transform: active ? `translate(16px, -6px) scale(0.75)` : `translate(16px, 16px) scale(1)`,
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
      padding: '0 10px',
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
      padding: '0 16px',
    }),

    hint: css({
      color: '#aaaaaa',
      padding: '0 16px',
    }),

    error: css({
      color: themeVar.neutral.error.error,
    }),

    seudo: css({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    }),
  };
};

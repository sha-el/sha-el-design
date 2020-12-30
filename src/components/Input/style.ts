import { lightText, borderColor as borderColorHelper, disabledText } from '../../helpers/color';
import { getColor } from '../../helpers';
import { createUseStyles } from 'react-jss';
import { theming } from '../Theme/Theme';

export const style = createUseStyles(
  {
    container: ({ theme, error, label, active, borderLess, disabled }) => {
      const borderColor = error ? theme.error : borderColorHelper(theme.background);

      const borderStyle = borderLess
        ? {
            borderBottom: `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
            borderRadius: '0',
          }
        : {
            border: `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
            borderTop: active && label ? 'none' : `1px ${disabled ? 'dotted' : 'solid'} ${borderColor}`,
            borderRadius: '4px',
          };

      return {
        ...borderStyle,
        position: 'relative',
        color: disabled ? disabledText(theme) : lightText(theme),
        fontSize: '14px',
        lineHeight: 1.12857,
        cursor: 'text',
        transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
        '&:focus-within': {
          borderColor: theme.primary,
          '& .seudo': {
            color: theme.primary,
          },
          '& .label': {
            color: theme.primary,
            '&:after, &:before': {
              borderColor: borderLess ? 'transparent' : theme.primary,
            },
          },
        },
        '&:hover': {
          borderColor: (!disabled && 'rgb(9, 30, 66)') || undefined,
          '& .label': {
            color: !disabled ? lightText(theme) : undefined,
            '&:after, &:before': {
              borderColor: !disabled ? (borderLess ? 'transparent' : 'rgb(9, 30, 66)') : undefined,
            },
          },
          '& .seudo': {
            color: 'rgb(9, 30, 66)',
          },
        },
      };
    },

    section: ({ theme, disabled }) => ({
      position: 'relative',
      boxSizing: 'border-box',
      color: disabled ? disabledText(theme) : lightText(theme),
      fontSize: '14px',
      lineHeight: 1.12857,
      maxWidth: '100%',
      transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      borderWidth: '1px',
    }),

    input: ({ theme, disabled, borderLess, before }) => ({
      fontSize: '14px',
      minWidth: '100%',
      display: 'inline',
      maxWidth: '100%',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
      lineHeight: '12px',
      padding: `9px ${borderLess ? '0' : before ? '5px' : '10px'}`,
      color: disabled ? disabledText(theme) : getColor(theme.background),
      boxSizing: 'border-box',
      height: '36px',
      fontFamily: '"Roboto", sans-serif',
      '&::placeholder': {
        color: '#aaaaaa',
      },
      '&:disabled': {
        cursor: 'not-allowed',
      },
    }),

    textarea: ({ theme, disabled }) => ({
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
      fontFamily: '"Roboto", sans-serif',
      '&::placeholder': {
        color: '#aaaaaa',
      },
    }),

    label: ({ theme, disabled, active, borderLess, isError }) => {
      const borderColor = isError ? theme.error : borderColorHelper(theme.background);

      return {
        position: 'absolute',
        display: 'flex',
        alignSelf: 'center',
        color: disabled ? disabledText(theme) : lightText(theme),
        boxSizing: 'border-box',
        left: 0,
        top: -7,
        height: '100%',
        pointerEvents: 'none',
        transition: 'line-height 0.2s',
        '&:after, &:before': {
          content: `''`,
          display: 'block',
          boxSizing: 'border-box',
          marginTop: '6px',
          borderTop: `${disabled ? 'dotted' : 'solid'} 1px`,
          borderTopColor: active && !borderLess ? borderColor : 'transparent',
          minWidth: borderLess ? '0px' : '10px',
          height: '8px',
          pointerEvents: 'none',
          boxShadow: 'inset 0 1px transparent',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        },
        '&:before': {
          marginRight: borderLess ? '0px' : '4px',
          borderTopLeftRadius: '4px',
        },
        '&:after': {
          flexGrow: 1,
          marginLeft: '4px',
          borderTopRightRadius: '4px',
        },

        ...(active
          ? {
              fontSize: '10px',
              fontWeight: 400,
              lineHeight: '13px',
              width: '100%',
            }
          : {
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: '51px',
              width: '100%',
            }),
      };
    },

    help: {
      width: '100%',
      marginBottom: '20px',
      display: 'flex',
      placeContent: 'space-between',
      fontSize: '12px',
    },

    hint: {
      color: '#aaaaaa',
      padding: '0 5px',
    },

    error: ({ theme }) => ({
      color: theme.error,
      padding: '0 5px',
    }),

    seudo: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  { theming, name: 'sha-el-input' },
);

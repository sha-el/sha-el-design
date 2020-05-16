import { stylesheet } from 'typestyle';
import {
  lightText,
  borderColor as borderColorHelper,
} from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { getColor } from '../../helpers';

export function style(
  theme: Theme,
  isError: boolean,
  label: boolean,
  active: boolean,
) {
  const borderColor = isError
    ? theme.error
    : borderColorHelper(theme.background);
  return stylesheet({
    container: {
      position: 'relative',
      color: lightText(theme),
      fontSize: '14px',
      lineHeight: 1.12857,
      borderWidth: '1px',
      borderColor,
      borderRadius: '4px',
      borderStyle: 'solid',
      cursor: 'text',
      borderTop: active && label && 'none',
      transition:
        'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      $nest: {
        '&:focus-within': {
          borderColor: theme.primary,
          background: theme.background,

          $nest: {
            '.seudo': {
              color: theme.primary,
            },
            '.label': {
              color: theme.primary,
            },
            '*': {
              $nest: {
                '&::after, &::before': {
                  borderColor: theme.primary,
                },
              },
            },
          },
        },
        '&:hover': {
          borderColor: !active && 'rgb(9, 30, 66)',
        },
      },
    },

    section: {
        position: 'relative',
        boxSizing: 'border-box',
        color: lightText(theme),
        display: 'flex',
        fontSize: '14px',
        justifyContent: 'space-between',
        lineHeight: 1.12857,
        maxWidth: '100%',
        flex: '1 0 auto',
        transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
        borderWidth: '1px',
      },
    input: {
      fontSize: '16px',
      width: '100%',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
      lineHeight: '12px',
      padding: '15px',
      color: getColor(theme.background),
      boxSizing: 'border-box',
      $nest: {
        '&::placeholder': {
          color: '#aaaaaa',
        },
      },
    },
    textarea: {
        fontSize: '16px',
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
        color: getColor(theme.background),
        $nest: {
          '&::placeholder': {
            color: '#aaaaaa',
          },
        },
      },
    label: {
      position: 'absolute',
      display: 'flex',
      alignSelf: 'center',
      color: lightText(theme),
      boxSizing: 'border-box',
      left: 0,
      top: -7,
      height: '100%',
      pointerEvents: 'none',
      transition: 'line-height 0.2s',
      $nest: {
        '&::after, &::before': {
          content: `''`,
          display: 'block',
          boxSizing: 'border-box',
          marginTop: '6px',
          borderTop: 'solid 1px',
          borderTopColor: active ? borderColor : 'transparent',
          minWidth: '10px',
          height: '8px',
          pointerEvents: 'none',
          boxShadow: 'inset 0 1px transparent',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        },
        '&::before': {
          marginRight: '4px',
          borderTopLeftRadius: '4px',
        },
        '&::after': {
          flexGrow: 1,
          marginLeft: '4px',
          borderTopRightRadius: '4px',
        },
      },
      ...(active
        ? {
            fontSize: '10px',
            fontWeight: 400,
            lineHeight: '14px',
            width: '100%',
          }
        : {
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: '58px',
          }),
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
    error: {
      color: theme.error,
      padding: '0 5px',
    },
    seudo: {
      display: 'flex',
      alignItems: 'center',
    },
  });
}
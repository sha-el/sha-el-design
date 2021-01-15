import { createUseStyles } from 'react-jss';
import { borderColor } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme, theming } from '../Theme/Theme';

export const radioStyle = createUseStyles(
  (theme: Theme) => ({
    container: ({ disabled, block }) => ({
      cursor: disabled ? 'not-allowed' : 'pointer',
      margin: '10px 0',
      fontWeight: 'lighter',
      boxShadow: block && shadow('BOT', theme),
      lineHeight: '22px',
      display: 'inline',
    }),
    label: () => {
      const backgroundColor = theme.primary;
      return {
        color: theme.textColor,
        transition: 'all .5s',
        pointerEvents: 'none',
        fontSize: '16px',
        marginLeft: '30px',
        position: 'relative',
        '&:before': {
          cursor: 'pointer',
          content: '""',
          border: `1px solid ${backgroundColor}`,
          position: 'absolute',
          borderRadius: '50%',
          left: '-23px',
          top: '0',
          width: '16px',
          height: '16px',
          zIndex: 0,
          transition: '.4s ease',
          background: `linear-gradient(to bottom, white 50%, ${backgroundColor} 50%)`,
          backgroundSize: '100% 200%',
          backgroundPosition: 'left top',
        },
        '&:after': {
          content: '""',
          cursor: 'pointer',
          position: 'absolute',
          left: '0',
          top: '0',
          margin: '4px',
          width: '16px',
          height: '16px',
          zIndex: 0,
          transition: '.28s ease',
        },
      };
    },
    errorStyle: {
      fontSize: '14px',
      color: theme.error,
    },
    radio: {
      display: 'none',
      '&:checked': {
        '& ~ label:before': {
          backgroundPosition: 'right bottom',
        },
      },
      '&:disabled': {
        color: borderColor(theme.background),
        '& ~ label:before': {
          border: `1px solid ${borderColor(theme.background)}`,
          background: `linear-gradient(to bottom, white 50%, ${borderColor(theme.background)} 50%)`,
          backgroundPosition: 'right bottom',
        },
      },
    },
  }),
  { theming, name: 'sha-el-radio' },
);

export const radioButtonStyle = createUseStyles(
  (theme: Theme) => ({
    errorStyle: {
      fontSize: '14px',
      color: theme.error,
    },
    radio: {
      display: 'none',
    },
  }),
  { theming, name: 'sha-el-radio-button' },
);

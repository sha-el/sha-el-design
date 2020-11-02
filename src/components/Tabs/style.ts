import { stylesheet } from 'typestyle';
import { Theme } from '../Theme/Theme';
import { hoverColor } from '../../helpers/color';
import { shadow } from '../../helpers/style';

export const style = (theme: Theme) => {
  const shadowBot = shadow('BOT', theme);

  return stylesheet({
    tabHeaderContainer: {
      display: 'flex',
      flex: '1 0 auto',
      boxShadow: shadowBot,
      background: theme.background,
      color: theme.textColor,
      position: 'relative',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
    },
    tabHeader: {
      padding: '0 16px',
      textTransform: 'uppercase',
      height: '50px',
      display: 'flex',
      flex: '0 0 auto',
      transition: 'all .6s',
      cursor: 'pointer',
      textAlign: 'center',
      fontWeight: 500,
      justifyContent: 'center',
      alignItems: 'center',
      letterSpacing: '0.0892857143em',
      minWidth: '90px',
      maxWidth: '360px',
      outline: 'none',
      position: 'relative',
      boxSizing: 'border-box',
      textDecoration: 'none',
      userSelect: 'none',
      $nest: {
        '&:hover': {
          color: theme.primary,
          background: hoverColor(theme.background),
        },
      },
    },
    inkBar: {
      background: theme.primary,
      height: '2px',
      position: 'absolute',
      zIndex: 1,
      transition: '.2s all',
    },
    tabPanelContainer: {
      overflowX: 'hidden',
      width: '100%',
      padding: '10px 0',
    },
  });
};

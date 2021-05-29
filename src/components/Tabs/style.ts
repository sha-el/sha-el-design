import { Theme } from '../Theme/Theme';
import { hoverColor } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { css } from '@emotion/css';
import { zAboveBase } from '../../helpers/zIndex';

export const style = (theme: Theme) => ({
  tabHeaderContainer: css({
    display: 'flex',
    flex: '1 0 auto',
    boxShadow: shadow('BOT', theme),
    background: theme.background,
    color: theme.textColor,
    position: 'relative',
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
  }),
  tabHeader: css({
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
    '&:hover': {
      color: theme.primary,
      filter: hoverColor(theme.background),
      background: theme.background,
    },
  }),
  inkBar: css({
    background: theme.primary,
    height: '2px',
    position: 'absolute',
    zIndex: zAboveBase,
    transition: '.2s all',
  }),
  tabPanelContainer: css({
    overflowX: 'hidden',
    width: '100%',
    padding: '10px 0',
  }),
});

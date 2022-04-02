import { css } from '@emotion/css';
import { zIndexBase } from '../../helpers/zIndex';
import { themeVar } from '../Theme/helper';

export const style = () => ({
  tabHeaderContainer: css({
    display: 'flex',
    flex: '1 0 auto',
    background: themeVar.neutral.neutralKeyColor.surface,
    color: themeVar.neutral.neutralKeyColor.onSurface,
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
      color: themeVar.accent.primaryKeyColor.primary,
      filter: themeVar.accent.secondaryKeyColor.secondary,
      background: themeVar.neutral.neutralKeyColor.surface,
    },
  }),
  inkBar: css({
    background: themeVar.accent.primaryKeyColor.primary,
    height: '2px',
    position: 'absolute',
    zIndex: zIndexBase,
    transition: '.2s all',
  }),
  tabPanelContainer: css({
    overflowX: 'hidden',
    width: '100%',
    padding: '10px 0',
  }),
});

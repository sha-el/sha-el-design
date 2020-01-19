import { stylesheet } from 'typestyle';
import { Theme } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';

export const style = (theme: Theme) => stylesheet({
  tabHeaderContainer: {
    display: 'flex',
    flex: '1 0 auto',
    boxShadow: styleEnum.shadow_bot,
    background: 'white',
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
    textDecoration: 'none',
    userSelect: 'none',

    $nest: {
      '&:hover': {
        color: theme.primary,
        background: '#eee',
      },
    },
  },
  inkBar: {
    background: theme.primary,
    height: '2px',
    position: 'absolute',
    zIndex: 1,
  },

  tabPanelContainer: {
    overflowX: 'hidden',
    width: '100%',
    padding: '10px 0',
  },
});
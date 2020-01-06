import { stylesheet } from 'typestyle';
import { Theme } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';

export const style = (theme: Theme) => stylesheet({
  tabHeaderContainer: {
    width: '100%',
    display: 'flex',
    boxShadow: styleEnum.shadow_bot,
    background: 'white',
  },
  tabHeader: {
    padding: '5px 20px',
    display: 'flex',
    flex: 0,
    transition: 'all .6s',
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        color: theme.primary,
      },
    },
  },
  inkBar: {
    background: theme.primary,
    height: '1px',
    position: 'absolute',
  },

  tabPanelContainer: {
    overflowX: 'hidden',
    width: '100%',
    padding: '10px 0',
  },
});
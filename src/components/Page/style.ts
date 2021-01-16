import { createUseStyles } from 'react-jss';
import { lightText } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme, theming } from '../Theme/Theme';

export const style = createUseStyles(
  (theme: Theme) => ({
    container: {},
    header: () => {
      const shadow2x = shadow('2X', theme);
      return {
        padding: '0px 1.5%',
        background: theme.background,
        color: theme.textColor,
        boxShadow: shadow2x,
        borderRadius: '4px',
        marginBottom: '10px',
      };
    },
    bottom: {
      marginTop: '24px',
      minHeight: '50px',
    },
    inline: {
      display: 'inline-block',
      marginRight: '.5em',
    },
    backIcon: () => {
      const shadowDef = shadow('DEFAULT', theme);
      return {
        boxShadow: shadowDef,
        width: '40px',
        height: '40px',
        borderRadius: '100%',
        color: lightText(theme),
        display: 'flex',
        alignItems: 'center',
        fontSize: '22px',
        boxSizing: 'border-box',
        padding: '10px',
        cursor: 'pointer',
      };
    },
  }),
  { theming, name: 'sha-el-page' },
);

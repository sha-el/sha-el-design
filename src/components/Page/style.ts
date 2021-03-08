import { css } from '@emotion/css';
import { lightText } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme) => ({
  header: css({
    padding: '0px 1.5%',
    background: theme.background,
    color: theme.textColor,
    boxShadow: shadow('2X', theme),
    borderRadius: '4px',
    marginBottom: '10px',
  }),
  bottom: css({
    marginTop: '24px',
    minHeight: '50px',
  }),
  inline: css({
    display: 'inline-block',
    marginRight: '.5em',
  }),
  backIcon: css({
    boxShadow: shadow('DEFAULT', theme),
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
  }),
});

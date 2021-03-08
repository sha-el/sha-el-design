import { css } from '@emotion/css';
import { colorShades, lightText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme) => {
  const [, , primary3] = colorShades(theme.primary);
  return css({
    color: theme.textColor,
    '& li': {
      fontSize: '16px',
      letterSpacing: '0.00938em',
      listStyleType: 'none',
      lineHeight: '1.5',
      fontWeight: 400,
      color: lightText(theme),
      cursor: 'pointer',
      '& *': {
        color: lightText(theme),
      },
      '&:last-child': {
        '& *': {
          color: primary3,
        },
      },
      '&.breadcrumb-seperator': {
        margin: '0 10px',
        display: 'flex',
        alignItems: 'center',
      },
    },
  });
};

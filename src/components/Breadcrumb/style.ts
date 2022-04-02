import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const style = () => {
  return css({
    color: themeVar.neutral.neutralKeyColor.onSurface,
    '& li': {
      fontSize: '16px',
      letterSpacing: '0.00938em',
      listStyleType: 'none',
      lineHeight: '1.5',
      fontWeight: 400,
      color: themeVar.neutral.neutralVariantKeyColor.onSurfaceVariant,
      cursor: 'pointer',
      '& *': {
        color: themeVar.neutral.neutralVariantKeyColor.onSurfaceVariant,
      },
      '&:last-child': {
        '& *': {
          color: themeVar.neutral.neutralKeyColor.onSurface,
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

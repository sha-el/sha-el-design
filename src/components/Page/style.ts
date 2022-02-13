import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const style = () => ({
  header: css({
    background: themeVar.neutral.neutralKeyColor.surface,
    color: themeVar.neutral.neutralKeyColor.onSurface,
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
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    color: themeVar.neutral.neutralVariantKeyColor.outline,
    display: 'flex',
    alignItems: 'center',
    fontSize: '22px',
    boxSizing: 'border-box',
    padding: '10px',
    cursor: 'pointer',
  }),
});

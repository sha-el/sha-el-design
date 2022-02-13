import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const style = () => ({
  number: css({
    borderRadius: '100%',
    width: '32px',
    height: '32px',
    textAlign: 'center',
    color: themeVar.accent.tertiaryKeyColor.onTertiaryContainer,
    background: themeVar.accent.tertiaryKeyColor.tertiaryContainer,
  }),
  icon: css({
    fontSize: '28px',
    padding: '0.5rem',
    color: themeVar.neutral.neutralVariantKeyColor.outline,
  }),
  active: css({
    color: themeVar.accent.primaryKeyColor.onPrimary,
    background: themeVar.accent.primaryKeyColor.primary,
  }),
  activeIcon: css({
    color: themeVar.accent.primaryKeyColor.primary,
  }),
  error: css({
    color: themeVar.neutral.error.error,
  }),
  success: css({
    color: themeVar.accent.secondaryKeyColor.secondary,
  }),
  clickable: css({
    cursor: 'pointer',
  }),
  disabled: css({
    color: themeVar.neutral.error.disabled,
    cursor: 'not-allowed',
  }),
  container: css({
    padding: '0.5rem',
  }),
});

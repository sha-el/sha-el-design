import { css } from '@emotion/css';
import { borderCss } from '../../helpers/border';
import { elevationCss } from '../../helpers/elevations';
import { themeVar } from '../Theme/helper';
import { ButtonProps } from './Button';

export const buttonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyItems: 'center',
  textDecoration: 'none',
  boxSizing: 'border-box',
  letterSpacing: '1px',
  textTransform: 'capitalize',
  fontWeight: 500,
  textAlign: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  transition: 'all .3s',

  height: '40px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '20px',
  fontFamily: "'Roboto', sans-serif",
  '&:hover': {
    filter: 'brightness(1.05)',
  },
});

const buttonTypeColor = (props: ButtonProps, tone?: number) => {
  if (props.error) {
    return {
      background: themeVar.neutral.error.error,
      color: themeVar.neutral.error.onError,
      '&hover': {
        filter: 'brightness(1.1)',
      },
    };
  }

  if (props.disabled || props.loading) {
    if (props.text || props.outlined) {
      return {
        color: themeVar.neutral.error.disabled,
        background: 'none',
        cursor: 'not-allowed',
        '&:hover': {
          filter: 'none !important',
        },
      };
    }
    return {
      background: 'rgba(0, 0, 0, 0.12)',
      cursor: 'not-allowed',
      '&:hover': {
        filter: 'none !important',
      },
    };
  }

  const primary = {
    background: tone ? themeVar.accent.primaryKeyColor.tones(tone) : themeVar.accent.primaryKeyColor.primary,
    color: themeVar.accent.primaryKeyColor.onPrimary,
    '&:hover': {
      background: themeVar.accent.primaryKeyColor.tones(4),
    },
  };

  if (props.primary) {
    return primary;
  }

  if (props.secondary) {
    return {
      background: tone ? themeVar.accent.secondaryKeyColor.tones(tone) : themeVar.accent.secondaryKeyColor.secondary,
      color: themeVar.accent.secondaryKeyColor.onSecondary,
      '&:hover': {
        background: themeVar.accent.secondaryKeyColor.tones(4),
      },
    };
  }
  if (props.tertiary) {
    return {
      background: tone ? themeVar.accent.tertiaryKeyColor.tones(tone) : themeVar.accent.tertiaryKeyColor.tertiary,
      color: themeVar.accent.tertiaryKeyColor.onTertiary,
      '&:hover': {
        background: themeVar.accent.tertiaryKeyColor.tones(4),
      },
    };
  }

  return primary;
};

export const buttonTypeStyle = (props: ButtonProps): string => {
  if (props.disabled) {
    return css(buttonTypeColor(props));
  }

  if (props.elevated) {
    return [
      elevationCss(1),
      css({ background: themeVar.neutral.neutralKeyColor.surface, color: buttonTypeColor(props).background }),
    ].join(' ');
  }

  if (props.filled) {
    return css(buttonTypeColor(props));
  }

  if (props.filledTonal) {
    return css({
      color: themeVar.neutral.neutralKeyColor.onSurface,
      background: buttonTypeColor(props, 10).background,
      '&:hover': {
        background: buttonTypeColor(props, 8).background,
      },
    });
  }

  if (props.outlined) {
    return [
      borderCss(1),
      css({
        color: buttonTypeColor(props).background,
        borderColor: buttonTypeColor(props).background + ' !important',
        background: themeVar.neutral.neutralKeyColor.surface,
      }),
    ].join(' ');
  }

  if (props.text) {
    return css({
      color: buttonTypeColor(props).background,
      background: 'transparent',
    });
  }
};

export const buttonGroupStyle = css({
  '& button': {
    borderRadius: '0',
    '&:first-child': {
      borderRadius: '5px 0 0 5px',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
  },
  '& a': {
    boxSizing: 'border-box',
    borderRadius: '0',
    '&:first-child': {
      borderRadius: '5px 0 0 5px',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
  },
  '& *:first-child': {
    '& button': {
      borderRadius: '5px 0 0 5px !important',
    },
  },
  '& *:last-child': {
    '& button': {
      borderRadius: '0 5px 5px 0 !important',
    },
  },
});

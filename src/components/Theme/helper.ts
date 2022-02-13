import Color from 'color';
import { flattenObj } from '../../helpers';
import { colorTonesGenerator, getColor } from '../../helpers/color';
import { ThemeInternal, Theme } from './Theme';

export const toInternalTheme = (theme: Theme): ThemeInternal => {
  const primaryColorTones = colorTonesGenerator(theme.primary);
  const secondaryColorTones = colorTonesGenerator(theme.secondary);
  const tertiaryColorTones = colorTonesGenerator(theme.tertiary);
  const neutralVariantColorTones = colorTonesGenerator(theme.neutralVariant);

  const newTheme: Theme = {
    // For setting neutral, neutralvariant, error and type
    ...theme,
    primary: primaryColorTones[3],
    secondary: secondaryColorTones[3],
    tertiary: tertiaryColorTones[3],
  };

  return {
    accent: {
      primaryKeyColor: {
        primary: newTheme.primary,
        onPrimary: getColor(newTheme.primary),
        primaryContainer: primaryColorTones[8],
        onPrimaryContainer: primaryColorTones[2],
        tones: primaryColorTones,
      },
      secondaryKeyColor: {
        secondary: newTheme.secondary,
        onSecondary: getColor(newTheme.secondary),
        secondaryContainer: secondaryColorTones[8],
        onSecondaryContainer: secondaryColorTones[2],
        tones: secondaryColorTones,
      },
      tertiaryKeyColor: {
        tertiary: newTheme.tertiary,
        onTertiary: getColor(newTheme.tertiary),
        tertiaryContainer: tertiaryColorTones[8],
        onTertiaryContainer: tertiaryColorTones[2],
        tones: tertiaryColorTones,
      },
    },
    neutral: {
      neutralKeyColor: {
        background: '#FFF',
        onBackground: '#201a17',
        surface: '#FFFBFE',
        onSurface: '#1b1b1e',
      },
      neutralVariantKeyColor: {
        surfaceVariant: newTheme.neutralVariant,
        onSurfaceVariant: getColor(newTheme.neutralVariant),
        outline: Color(neutralVariantColorTones[4]).mix(Color(primaryColorTones[4]), 1).toString(),
      },
      error: {
        error: theme.error,
        onError: getColor(theme.error),
        errorContainer: '#ba1b1b',
        onErrorContainer: '#410001',
        disabled: primaryColorTones[11],
      },
    },
  };
};

export const toCss = (theme: ThemeInternal) => {
  const flattenTheme = {};
  flattenObj(theme, '', flattenTheme);
  return Object.keys(flattenTheme).reduce((pv, cv) => (pv += `\n--${cv}: ${flattenTheme[cv]};`), '');
};

export const themeVar: ThemeInternal<(tone: number) => string> = {
  accent: {
    primaryKeyColor: {
      primary: 'var(--accent-primaryKeyColor-primary)',
      onPrimary: 'var(--accent-primaryKeyColor-onPrimary)',
      primaryContainer: 'var(--accent-primaryKeyColor-primaryContainer)',
      onPrimaryContainer: 'var(--accent-primaryKeyColor-onPrimaryContainer)',
      tones: (tone: number) => `var(--accent-primaryKeyColor-tones-${tone})`,
    },
    secondaryKeyColor: {
      secondary: 'var(--accent-secondaryKeyColor-secondary)',
      onSecondary: 'var(--accent-secondaryKeyColor-onSecondary)',
      secondaryContainer: 'var(--accent-secondaryKeyColor-secondaryContainer)',
      onSecondaryContainer: 'var(--accent-secondaryKeyColor-onSecondaryContainer)',
      tones: (tone: number) => `var(--accent-secondaryKeyColor-tones-${tone})`,
    },
    tertiaryKeyColor: {
      tertiary: 'var(--accent-tertiaryKeyColor-tertiary)',
      onTertiary: 'var(--accent-tertiaryKeyColor-onTertiary)',
      tertiaryContainer: 'var(--accent-tertiaryKeyColor-tertiaryContainer)',
      onTertiaryContainer: 'var(--accent-tertiaryKeyColor-onTertiaryContainer)',
      tones: (tone: number) => `var(--accent-tertiaryKeyColor-tones-${tone})`,
    },
  },
  neutral: {
    neutralKeyColor: {
      background: 'var(--neutral-neutralKeyColor-background)',
      onBackground: 'var(--neutral-neutralKeyColor-onBackground)',
      surface: 'var(--neutral-neutralKeyColor-surface)',
      onSurface: 'var(--neutral-neutralKeyColor-onSurface)',
    },
    neutralVariantKeyColor: {
      surfaceVariant: 'var(--neutral-neutralVariantKeyColor-surfaceVariant)',
      onSurfaceVariant: 'var(--neutral-neutralVariantKeyColor-onSurfaceVariant)',
      outline: 'var(--neutral-neutralVariantKeyColor-outline)',
    },
    error: {
      error: 'var(--neutral-error-error)',
      onError: 'var(--neutral-error-onError)',
      errorContainer: 'var(--neutral-error-errorContainer)',
      onErrorContainer: 'var(--neutral-error-onErrorContainer)',
      disabled: 'var(--neutral-error-disabled)',
    },
  },
};

export const LIGHT_THEME: Theme = {
  primary: '#3A0CA3',
  secondary: '#4CC9F0',
  tertiary: '#F72585',
  error: '#f00',
  neutral: '#98F5E1',
  neutralVariant: '#E7E0EC',
  type: 'light',
};

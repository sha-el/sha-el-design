import * as React from 'react';
import { ThemeProvider as EmoThemeProvider } from '@emotion/react';
import { initElevations } from '../../helpers/elevations';
import { initBorders } from '../../helpers/border';
import { LIGHT_THEME, toCss, toInternalTheme } from './helper';

export const useTheme = (theme = LIGHT_THEME) => {
  const internalTheme = toInternalTheme(theme);
  const style = document.querySelector('#sha-el-design-theme-consumer') || document.createElement('style');
  style.id = 'sha-el-design-theme-consumer';

  style.innerHTML = `
        :root {
          ${toCss(internalTheme)}
        }
        ${initElevations(internalTheme)}
        ${initBorders()}`;
  document.getElementsByTagName('head')[0].appendChild(style);
  return internalTheme;
};

export const ThemeProvider: React.FunctionComponent<ThemeProps> = (props) => {
  useTheme(props.theme);
  return <EmoThemeProvider theme={toInternalTheme(props.theme)}>{props.children}</EmoThemeProvider>;
};

ThemeProvider.defaultProps = {
  theme: LIGHT_THEME,
};

interface ThemeProps {
  theme?: Theme;
}

export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  neutralVariant: string;
  error: string;
  type: 'light' | 'dark';
}

export interface ThemeInternal<T = string[]> {
  accent: {
    primaryKeyColor: {
      primary: string;
      onPrimary: string;
      primaryContainer: string;
      onPrimaryContainer: string;
      tones: T;
    };
    secondaryKeyColor: {
      secondary: string;
      onSecondary: string;
      secondaryContainer: string;
      onSecondaryContainer: string;
      tones: T;
    };
    tertiaryKeyColor: {
      tertiary: string;
      onTertiary: string;
      tertiaryContainer: string;
      onTertiaryContainer: string;
      tones: T;
    };
  };
  neutral: {
    neutralKeyColor: {
      background: string;
      onBackground: string;
      surface: string;
      onSurface: string;
    };
    neutralVariantKeyColor: {
      surfaceVariant: string;
      onSurfaceVariant: string;
      outline: string;
    };
    error: {
      error: string;
      onError: string;
      errorContainer: string;
      onErrorContainer: string;
      disabled: string;
    };
  };
}

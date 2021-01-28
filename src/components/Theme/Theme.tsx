import * as React from 'react';
import { color } from 'csx';
import { createTheming } from 'react-jss';

export const DARK_THEME = {
  primary: '#536DFE',
  secondary: '#f06292',
  default: '#10163a',
  background: '#23232D',
  bodyBg: '#13131A', // #f0f2f5
  error: '#f44336',
  danger: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  textColor: '#fff',
};

const LIGHT_THEME = {
  primary: '#536DFE',
  secondary: '#f06292',
  default: '#eeeeee',
  background: '#ffffff',
  bodyBg: '#F6F7FF',
  error: '#f44336',
  danger: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  textColor: 'rgba(0,0,0,0.87)',
};

const ThemeContext = React.createContext<Theme>(LIGHT_THEME);

export const theming = createTheming(ThemeContext);
export const useTheme = () => {
  const theme = theming.useTheme();
  const style = document.querySelector('#sha-el-design-theme-consumer') || document.createElement('style');
  style.id = 'sha-el-design-theme-consumer';
  style.innerHTML = `
        :root {
          --primary: ${color(theme.primary).lighten(0.5)};
          --background: ${theme.bodyBg};
          --color: ${theme.textColor}
        }`;
  document.getElementsByTagName('head')[0].appendChild(style);
  return theme;
};

export const ThemeProvider: React.FunctionComponent<ThemeProps> = (props) => {
  const theme = { ...(props.theme === 'DARK' ? DARK_THEME : LIGHT_THEME), ...(props.colors || {}) };
  return <theming.ThemeProvider theme={theme}>{props.children}</theming.ThemeProvider>;
};

ThemeProvider.defaultProps = {
  theme: 'DARK',
};

export const ThemeConsumer: React.FunctionComponent<{ children: (theme: Theme) => React.ReactElement | null }> = (
  props,
) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        const style = document.querySelector('#sha-el-design-theme-consumer') || document.createElement('style');
        style.id = 'sha-el-design-theme-consumer';
        style.innerHTML = `
        :root {
          --primary: ${color(theme.primary).lighten(0.5)};
          --background: ${theme.bodyBg};
          --color: ${theme.textColor}
        }`;
        document.getElementsByTagName('head')[0].appendChild(style);
        return props.children(theme);
      }}
    </ThemeContext.Consumer>
  );
};

interface ThemeProps {
  theme: 'LIGHT' | 'DARK';
  colors?: Record<keyof Theme, string>;
}

export interface Theme {
  primary: string;
  secondary: string;
  default: string;
  error: string;
  danger: string;
  warning: string;
  info: string;

  bodyBg: string;
  background: string;
  textColor: string;
}

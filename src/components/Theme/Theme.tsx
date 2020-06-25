import * as React from 'react';
import { cssRaw } from 'typestyle';
import { color } from 'csx';

const DARK_THEME = {
  primary: '#536DFE',
  secondary: '#f06292',
  default: '#10163a',
  background: '#23232D',
  bodyBg: '#13131A', // #f0f2f5
  error: '#ff0000',
  danger: '#ff0000',
  warning: '#F09266',
  info: '#67A57F',
  textColor: '#c2c6dc',
};

const LIGHT_THEME = {
  primary: '#536DFE',
  secondary: '#f06292',
  default: '#eeeeee',
  background: '#ffffff',
  bodyBg: '#f0f2f5',
  error: '#ff0000',
  danger: '#ff0000',
  warning: '#F09266',
  info: '#67A57F',
  textColor: '#555',
};

const ThemeContext = React.createContext<Theme>(LIGHT_THEME);

export const ThemeProvider: React.FunctionComponent<ThemeProps> = (props) => {
  const theme = { ...(props.theme === 'DARK' ? DARK_THEME : LIGHT_THEME), ...(props.colors || {}) };
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  theme: 'DARK',
};

export const ThemeConsumer: React.FunctionComponent<{ children: (theme: Theme) => (React.ReactElement | null) }> = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        cssRaw(`
          :root {
            --primary: ${color(theme.primary).lighten(.5)};
            --background: ${theme.bodyBg};
            --color: ${theme.textColor}
          }`,
        );
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

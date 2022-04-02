import React from 'react';
import { ThemeProvider } from '../src/components/Theme/Theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'LIGHT',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['LIGHT', 'DARK'],
    },
  },
};

const withThemeProvider=(Story,context)=>{
  const theme = context.globals.theme;
  return (
    <ThemeProvider>
      <div style={{ minWidth: '400px' }}><Story {...context} /></div>
    </ThemeProvider>
  )
}
export const decorators = [withThemeProvider];
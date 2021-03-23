import { shadowColor } from './color';
import { Theme } from './../components/Theme/Theme';

export type ShadowType = 'DEFAULT' | '2X' | 'BOT' | 'BOT2X';

export const shadow = (type: ShadowType, theme: Theme, color?: string) => {
  let [first, second, third] = shadowColor(theme);

  if (color) {
    first = color;
    second = color;
    third = color;
  }

  switch (type) {
    case 'DEFAULT':
      return `0 3px 1px -2px ${first},
      0 2px 2px 0 ${second},
      0 1px 5px 0 ${third}`;

    case '2X':
      return `0px 3px 11px 0px ${first},
      0 3px 3px -2px ${second},
      0 1px 8px 0 ${third}`;

    case 'BOT':
      return `0 2px 1.5px -1.5px ${second}`;

    case 'BOT2X':
      return `0 2px 4px 0 ${first}`;
  }
};

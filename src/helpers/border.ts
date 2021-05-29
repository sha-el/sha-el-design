import Color from 'color';
import { Theme } from '../components/Theme/Theme';
import { borderColor } from './color';

function createBroder(theme: Theme, px: number) {
  return `${px}px solid ${borderColor(theme.bodyBg)}`;
}

const lightThemeShadows = (theme: Theme) => [
  'none',
  createBroder(theme, 0.5),
  createBroder(theme, 1),
  createBroder(theme, 1.5),
  createBroder(theme, 2),
];

const darkThemeShadows = (theme: Theme) => [
  'none',
  createBroder(theme, 0.5),
  createBroder(theme, 1),
  createBroder(theme, 1.5),
  createBroder(theme, 2),
];

export const initBorders = (theme: Theme) => {
  let values = '';
  const color = Color(theme.bodyBg);

  const shadows: string[] = color.lightness() < 0.7 ? lightThemeShadows(theme) : darkThemeShadows(theme);

  shadows.forEach((shadow, index) => {
    values += `
    .border-level-${index} {
      border: ${shadow};
    }
    `;
  });

  return values;
};

export const getBorders = (theme: Theme, value: number) => {
  const shadows: string[] = Color(theme.bodyBg).lightness() < 0.7 ? lightThemeShadows(theme) : darkThemeShadows(theme);
  return shadows[value];
};

export const borderCss = (num: number) => num && `border-level-${num}`;

export enum Border {
  border_0 = 'border-level-0',
  border_1 = 'border-level-1',
  border_2 = 'border-level-2',
  border_3 = 'border-level-3',
  border_4 = 'border-level-4',
  border_5 = 'border-level-5',
}

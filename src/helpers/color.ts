import Color from 'color';
import { css } from '@emotion/css';
import { themeVar } from '../components/Theme/helper';
import { ColorChoices } from '../typings/color';

export function getColor(clr: string, black = '#555555', white = '#ffffff') {
  return Color(clr).lightness() > 70 ? black : white;
}

export const colorShades = (color: string, type?: 'light' | 'dark') => {
  const darkShades = [
    Color(color).darken(0.05).toString(),
    Color(color).darken(0.08).toString(),
    Color(color).darken(0.1).toString(),
    Color(color).darken(0.13).toString(),
    Color(color).darken(0.15).toString(),
    Color(color).darken(0.2).toString(),
  ];

  const lightShades = [
    Color(color).lighten(0.05).toString(),
    Color(color).lighten(0.08).toString(),
    Color(color).lighten(0.1).toString(),
    Color(color).lighten(0.13).toString(),
    Color(color).lighten(0.15).toString(),
    Color(color).lighten(0.2).toString(),
  ];

  if (type && type === 'dark') {
    return darkShades;
  }

  if (type && type === 'light') {
    return lightShades;
  }

  if (Color(color).lightness() > 0.6) {
    return darkShades;
  }

  return lightShades;
};

const hslManipulator = [
  [4, 100, 6],
  [6, 100, 11],
  [0, 84, 17],
  [0, 54, 27],
  [0, 43, 36],
  [0, 34, 46],
  [-2, 38, 56],
  [-1, 51, 66],
  [-1, 79, 77],
  [-5, 100, 84],
  [-18, 100, 90],
  [-22, 100, 95],
  [0, 0, 100],
];

export const colorTonesGenerator = (color: string) => {
  const colorObj = Color(color);

  const colorTones = hslManipulator.map((v) => {
    let newColor = colorObj.hue(colorObj.hue() + Number(v[0]));
    newColor = newColor.saturationv(v[1]);
    newColor = newColor.lightness(v[2]);

    return newColor.hsl().toString();
  });

  return colorTones;
};

export const colorFromChoices = (color: ColorChoices) => {
  const defaultColor = {
    background: themeVar.neutral.neutralKeyColor.surface,
    color: themeVar.neutral.neutralKeyColor.onSurface,
    text: themeVar.neutral.neutralKeyColor.onSurface,
  };

  if (!color) {
    return defaultColor;
  }

  switch (color) {
    case 'primary':
      return {
        background: themeVar.accent.primaryKeyColor.primaryContainer,
        color: themeVar.accent.primaryKeyColor.onPrimaryContainer,
        text: themeVar.accent.primaryKeyColor.primaryContainer,
      };
    case 'secondary':
      return {
        background: themeVar.accent.secondaryKeyColor.secondaryContainer,
        color: themeVar.accent.secondaryKeyColor.onSecondaryContainer,
        text: themeVar.accent.secondaryKeyColor.secondaryContainer,
      };
    case 'tertiary':
      return {
        background: themeVar.accent.tertiaryKeyColor.tertiaryContainer,
        color: themeVar.accent.tertiaryKeyColor.onTertiaryContainer,
        text: themeVar.accent.tertiaryKeyColor.tertiaryContainer,
      };
    case 'neutral':
      return defaultColor;
    case 'light':
      return {
        background: themeVar.accent.primaryKeyColor.tones(6),
        color: themeVar.accent.primaryKeyColor.tones(6),
        text: themeVar.accent.primaryKeyColor.tones(6),
      };
    case 'disabled':
      return {
        background: themeVar.neutral.error.disabled,
        color: themeVar.neutral.error.disabled,
        text: themeVar.neutral.error.disabled,
      };
    case 'error':
      return {
        background: themeVar.neutral.error.error,
        color: themeVar.neutral.error.onError,
        text: themeVar.neutral.error.error,
      };
    default:
      return {
        background: color,
        color: getColor(color),
        text: color,
      };
  }
};

export const filledCss = (filled: ColorChoices) => {
  return css(colorFromChoices(filled));
};

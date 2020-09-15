import { color as csxColor } from 'csx';
import { Theme } from '../components/Theme/Theme';

function createShadow(lightTheme = true, ...px) {
  let shadowKeyUmbraOpacity = 0.2;
  let shadowKeyPenumbraOpacity = 0.14;
  let shadowAmbientShadowOpacity = 0.12;

  if (lightTheme) {
    shadowKeyUmbraOpacity = 1 - shadowKeyUmbraOpacity;
    shadowKeyPenumbraOpacity = 1 - shadowKeyPenumbraOpacity;
    shadowAmbientShadowOpacity = 1 - shadowAmbientShadowOpacity;
  }

  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',');
}

const lightThemeShadows = [
  'none',
  createShadow(true, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  createShadow(true, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  createShadow(true, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
  createShadow(true, 0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  createShadow(true, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  createShadow(true, 0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  createShadow(true, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  createShadow(true, 0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  createShadow(true, 0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  createShadow(true, 0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  createShadow(true, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  createShadow(true, 0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  createShadow(true, 0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  createShadow(true, 0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  createShadow(true, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  createShadow(true, 0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  createShadow(true, 0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  createShadow(true, 0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  createShadow(true, 0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  createShadow(true, 0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  createShadow(true, 0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  createShadow(true, 0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  createShadow(true, 0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  createShadow(true, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
];

const darkThemeShadows = [
  'none',
  createShadow(false, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  createShadow(false, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  createShadow(false, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
  createShadow(false, 0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  createShadow(false, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  createShadow(false, 0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  createShadow(false, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  createShadow(false, 0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  createShadow(false, 0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  createShadow(false, 0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  createShadow(false, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  createShadow(false, 0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  createShadow(false, 0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  createShadow(false, 0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  createShadow(false, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  createShadow(false, 0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  createShadow(false, 0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  createShadow(false, 0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  createShadow(false, 0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  createShadow(false, 0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  createShadow(false, 0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  createShadow(false, 0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  createShadow(false, 0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  createShadow(false, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
];

const elevations = (theme: Theme) => {
  const values: { [key: string]: { boxShadow: string } } = {};
  const color = csxColor(theme.bodyBg);

  const shadows: string[] = color.lightness() < 0.7 ? lightThemeShadows : darkThemeShadows;

  shadows.forEach((shadow, index) => {
    values[`elevation${index}`] = {
      boxShadow: shadow,
    };
  });

  return values;
};

export default elevations;

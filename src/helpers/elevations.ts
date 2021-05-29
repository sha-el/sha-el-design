import Color from 'color';
import { Theme } from '../components/Theme/Theme';

function createShadow(lightTheme = true, ...px: number[]) {
  let shadowKeyUmbraOpacity = 0.12;
  let shadowKeyPenumbraOpacity = 0.08;
  let shadowAmbientShadowOpacity = 0.05;

  if (lightTheme) {
    shadowKeyUmbraOpacity = 1 - shadowKeyUmbraOpacity;
    shadowKeyPenumbraOpacity = 1 - shadowKeyPenumbraOpacity;
    shadowAmbientShadowOpacity = 1 - shadowAmbientShadowOpacity;
  }

  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(34,41,47,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(34,41,47,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(34,41,47,${shadowAmbientShadowOpacity})`,
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

export const initElevations = (theme: Theme) => {
  let values = '';
  const color = Color(theme.bodyBg);

  const shadows: string[] = color.lightness() < 0.7 ? lightThemeShadows : darkThemeShadows;

  shadows.forEach((shadow, index) => {
    values += `
    .elevation-level-${index} {
      box-shadow: ${shadow};
    }
    `;
  });

  return values;
};

export const elevationCss = (num: number) => `elevation-level-${num}`;

export enum Elevation {
  elevation_0 = 'elevation-level-0',
  elevation_1 = 'elevation-level-1',
  elevation_2 = 'elevation-level-2',
  elevation_3 = 'elevation-level-3',
  elevation_4 = 'elevation-level-4',
  elevation_5 = 'elevation-level-5',
  elevation_6 = 'elevation-level-6',
  elevation_7 = 'elevation-level-7',
  elevation_8 = 'elevation-level-8',
  elevation_9 = 'elevation-level-9',
  elevation_10 = 'elevation-level-10',
  elevation_11 = 'elevation-level-11',
  elevation_12 = 'elevation-level-12',
  elevation_13 = 'elevation-level-13',
  elevation_14 = 'elevation-level-14',
  elevation_15 = 'elevation-level-15',
  elevation_16 = 'elevation-level-16',
  elevation_17 = 'elevation-level-17',
  elevation_18 = 'elevation-level-18',
  elevation_19 = 'elevation-level-19',
  elevation_20 = 'elevation-level-20',
  elevation_21 = 'elevation-level-21',
  elevation_22 = 'elevation-level-22',
  elevation_23 = 'elevation-level-23',
  elevation_24 = 'elevation-level-24',
}

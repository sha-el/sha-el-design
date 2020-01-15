import { color } from 'csx';
import { cssRule, cssRaw, createTypeStyle } from 'typestyle';
import { normalize } from 'csstips';

import { ThemeService } from './theme';
import { initializeNotification } from './../components/Notification/Notification';

import popverCss from './popover.css';
import topography from './topography.css';

export function removeObjectProperties<T>(obj: T, ...props: (keyof T)[]): Omit<T, keyof T> {
  obj = { ...obj };
  for (let i = 0; i < props.length; i++) {
    if (obj.hasOwnProperty(props[i])) {
      delete obj[props[i]];
    }
  }
  return obj;
}

export function nestedAccess<
  T,
  P1 extends keyof NonNullable<T>
>(obj: T, prop1: P1): NonNullable<T>[P1] | undefined;

export function nestedAccess<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>
>(obj: T, prop1: P1, prop2: P2): NonNullable<NonNullable<T>[P1]>[P2] | undefined;

export function nestedAccess<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>
>(obj: T, prop1: P1, prop2: P2, prop3: P3): NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3] | undefined;

export function nestedAccess<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>,
  P4 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>
>(obj: T, prop1: P1, prop2: P2, prop3: P3): NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>[P4] | undefined;

export function nestedAccess(obj: any, ...props: string[]): any {
  return obj && props.reduce(
    (result, prop) => result == null ? undefined : result[prop],
    obj,
  );
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function getColor(clr: string, black = '#000000', white = '#ffffff') {
  return color(clr).lightness() > .5 ? black : white;
}

export function initialize() {

  const t = new ThemeService();

  t.selectedTheme$.subscribe(v => cssRaw(`
    :root {
      --primary: ${color(v.primary).lighten(.5)}
    }`,
  ));

  cssRaw(`
  html {
    // overflow-x: hidden;
  }
  body {
    background: #f0f2f5;
  }
  a, a:hover, a:focus, a:active {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  ${popverCss}
  ${topography}
`);

  normalize();
  initializeNotification();
}

export function arrayBetween(num1: number, num2: number) {
  const arr = [];
  for (let i = num1; i < num2; i++) {
    arr.push(i);
  }
  return arr;
}

export const isBrowser = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let col = '#';
  for (let i = 0; i < 6; i++) {
    col += letters[Math.floor(Math.random() * 16)];
  }
  return col;
}

import { color } from 'csx';
import { cssRule, cssRaw } from 'typestyle';
import { normalize } from 'csstips';

import { ThemeService } from './theme';
import { initializeNotification } from './../components/Notification/Notification';

import popverCss from './popover.css';

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

  cssRaw(`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400,700,800&display=swap');

  * {
    font-family: 'Nanum Myeongjo', serif !important;
  }
  body {
    background: rgb(240, 242, 245)
  }
  a {
    background: inherit;
    text-decoration: none;
  }
  ${popverCss}
`);

  new ThemeService();

  cssRule('span, div, input, button', {
    fontSize: '14px',
  });

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

import { color } from 'csx';
import { cssRaw } from 'typestyle';
import { initializeNotification } from './../components/Notification/Notification';

import popverCss from './popover.css';
import topography from './topography.css';

export function removeObjectProperties<T extends Record<string, unknown>>(
  obj: T,
  ...props: (keyof T)[]
): Omit<T, keyof T> {
  obj = { ...obj };
  for (let i = 0; i < props.length; i++) {
    if (obj.hasOwnProperty(props[i])) {
      delete obj[props[i]];
    }
  }
  return obj;
}

export function nestedAccess<T, P1 extends keyof NonNullable<T>>(obj: T, prop1: P1): NonNullable<T>[P1] | undefined;

export function nestedAccess<T, P1 extends keyof NonNullable<T>, P2 extends keyof NonNullable<NonNullable<T>[P1]>>(
  obj: T,
  prop1: P1,
  prop2: P2,
): NonNullable<NonNullable<T>[P1]>[P2] | undefined;

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
>(
  obj: T,
  prop1: P1,
  prop2: P2,
  prop3: P3,
): NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>[P4] | undefined;

export function nestedAccess<T>(obj: T, ...props: string[]): unknown {
  return obj && props.reduce((result, prop) => (result == null ? undefined : result[prop]), obj);
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function getColor(clr: string, black = '#555555', white = '#ffffff') {
  return color(clr).lightness() > 0.7 ? black : white;
}

export function initialize() {
  cssRaw(`
  body {
    background: var(--background);
    color: var(--color);
    margin: 0;
  }
  a, a:hover, a:focus, a:active {
    text-decoration: none;
    color: var(--color);
  }
  svg {
    display: flex;
  }
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,600,700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Fira+Code:300,400,500,600,700&display=swap');
  ${popverCss}
  ${topography}
`);

  // normalize();
  initializeNotification();
}

export function arrayBetween(num1: number, num2: number) {
  const arr: number[] = [];
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

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // tslint:disable-next-line: no-bitwise
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const setAttribute = <T>(obj: T, value: T[keyof T], propPath: string[]) => {
  const [head, ...rest] = propPath;

  const checkForNumber = () => {
    if (isNaN(Number(head))) {
      return head;
    }

    return Number(head);
  };

  !rest.length ? (obj[checkForNumber()] = value) : setAttribute(obj[checkForNumber()], value, rest);
};

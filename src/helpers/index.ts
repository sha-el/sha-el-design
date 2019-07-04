import { color } from 'csx';
import { ThemeService } from './theme';
import { cssRule, cssRaw } from 'typestyle';
import { normalize } from 'csstips';

export function removeObjectProperties<T>(obj: T, ...props: (keyof T)[]): Omit<T, keyof T> {
  obj = { ...obj };
  for (let i = 0; i < props.length; i++) {
    if (obj.hasOwnProperty(props[i])) {
      delete obj[props[i]];
    }
  }
  return obj;
}

export function nestedAccess<T>(nestedObject: T, ...items: [(keyof T), keyof T[keyof T]] | string[] | number[]) {
  let value = nestedObject as any;
  for (const i of items) {
    if (value) {
      value = value[i];
      continue;
    }
    break;
  }
  return value as any;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function getColor(clr: string, black = '#000000', white = '#ffffff') {
  return color(clr).lightness() > .5 ? black : white;
}

export function initialize() {

  cssRaw(`
  @import url('https://fonts.googleapis.com/css?family=Cinzel&display=swap');

  * {
    font-family: 'Cinzel', serif !important;
  }
`);

  new ThemeService();

  cssRule('span, div, input, button', {
    fontSize: '14px',
  });

  normalize();
}

export function arrayBetween(num1: number, num2: number) {
  const arr = [];
  for (let i = num1; i < num2; i++) {
    arr.push(i);
  }
  return arr;
}
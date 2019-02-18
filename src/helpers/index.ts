import { color } from 'csx';

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

export function getColor(clr: string, black = '#ffffff', white = '#000000') {
  return color(clr).lightness() > .5 ? black : white;
}
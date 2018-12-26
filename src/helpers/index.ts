export function removeObjectProperties<T>(obj: T, ...props: (keyof T)[]) {
  obj = { ...obj };
  for (let i = 0; i < props.length; i++) {
    if (obj.hasOwnProperty(props[i])) {
      delete obj[props[i]];
    }
  }
  return obj;
}

export function nestedAccess<T>(nestedObject: T, ...items: [(keyof T), keyof T[keyof T]] | string[]) {
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
import { Validator, ValidatiorType } from './index';

class Enum<T> implements Validator {
  public type = ValidatiorType.Enum;
  arr: T;

  constructor(arr: T) {
    this.arr = arr;
  }

  validate(value: any[]) {
    return value.map((v, index) => (this.arr as any).validate(value[index]));
  }
}

export const array = (v: any) => new Enum(v);
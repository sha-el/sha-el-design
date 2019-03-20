import { Validator, ValidatiorType } from './index';

export class Iterable implements Validator {
  public type = ValidatiorType.Iterable;
  private arr: Validator;

  constructor(arr: Validator) {
    this.arr = arr;
  }

  initialize() {
    return [this.arr.initialize()];
  }

  validate(value: any[]) {
    return value.map((v, index) => (this.arr as any).validate(value[index]));
  }
}

export const array = (v: any) => new Iterable(v);
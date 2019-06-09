import { Validator, ValidatiorType } from './index';

export class Iterable implements Validator<object> {
  public type = ValidatiorType.Iterable;
  private arr: Validator<object>;

  constructor(arr: Validator<object>) {
    this.arr = arr;
  }

  initialize() {
    return [this.arr.initialize()];
  }

  validate(value: any[]) {
    return value.map((v, index) => (this.arr as any).validate(value[index]));
  }
}

export const array = (v: Validator<object>) => new Iterable(v);
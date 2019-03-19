import { Validator, ValidatiorType } from './index';

export class Map<T> implements Validator {
  private object: T;

  constructor(object: T) {
    this.object = object;
  }

  public type = ValidatiorType.Map;

  validate(value: object) {
    const keys = Object.keys(this.object);
    const res = {};

    keys.forEach(v => {
      const response = this.object[v].validate(value[v]);
      res[v] = response;
    });
    return res;
  }
}

export const map = (v: any) => new Map(v);
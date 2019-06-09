import { Validator, ValidatiorType } from './index';

export class Map<T> implements Validator<T> {
  private object: T;

  constructor(object: T) {
    this.object = object;
  }

  public type = ValidatiorType.Map;

  initialize() {
    const keys = Object.keys(this.object);
    const res = {};

    keys.forEach(v => {
      const response = this.object[v].initialize();
      res[v] = response;
    });
    return res as T;
  }

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

export const map = <T>(v: T) => new Map(v);
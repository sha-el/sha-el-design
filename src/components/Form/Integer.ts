import { Validator, ValidatiorType } from './index';

export class Integer implements Validator {
  private _required: { required: boolean; message: string; };
  private _min: { len: number; message: string; };
  private _max: { len: number; message: string; };
  private _match: { reg: RegExp; message: string; };

  public type = ValidatiorType.Integer;

  required(message?: string) {
    this._required = { required: true, message };
    return this;
  }

  min(len: number, message?: string) {
    this._min = { len, message };
    return this;
  }

  max(len: number, message?: string) {
    this._max = { len, message };
    return this;
  }

  match(reg: RegExp, message: string) {
    this._match = { reg, message };
    return this;
  }

  validate(value: number) {
    if (this._required) {
      if (!value) return this._required.message;
    }
    if (this._min) {
      if (value < this._min.len) {
        return this._min.message;
      }
    }
    if (this._max) {
      if (value > this._max.len) {
        return this._max.message;
      }
    }
    if (this._match) {
      if (!this._match.reg.test(String(value))) {
        return this._match.message;
      }
    }
  }
}

export const int = () => new Integer();
import { Validator, ValidatiorType } from './index';

export class Text implements Validator<string> {
  private _required: { required: boolean; message: string; };
  private _length: { len: number; message: string; };
  private _min: { len: number; message: string; };
  private _max: { len: number; message: string; };
  private _match: { reg: RegExp; message: string; };
  private _default: string = '';

  type = ValidatiorType.Text;

  initialize() {
    return this._default;
  }

  required(message?: string) {
    this._required = { required: true, message };
    return this;
  }

  length(len: number, message?: string) {
    this._length = { len, message };
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

  default(value: string) {
    this._default = value;
    return this;
  }

  validate(value: string) {
    if (this._required) {
      if (!value) return this._required.message;
    }
    if (this._length) {
      if (value.length !== this._length.len) {
        return this._length.message;
      }
    }
    if (this._min) {
      if (value.length < this._min.len) {
        return this._min.message;
      }
    }
    if (this._max) {
      if (value.length > this._max.len) {
        return this._max.message;
      }
    }
    if (this._match) {
      if (!this._match.reg.test(value)) {
        return this._match.message;
      }
    }
  }
}

export const text = () => new Text();

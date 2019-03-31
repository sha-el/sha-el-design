import { Validator, ValidatiorType } from './index';

export class BooleanSchema implements Validator {
  private _required: { required: boolean; message: string; };
  private _default: boolean;

  public type = ValidatiorType.Boolean;

  initialize() {
    return this._default;
  }

  required(message?: string) {
    this._required = { required: true, message };
    return this;
  }

  default(value: boolean) {
    this._default = value;
    return this;
  }

  validate(value: boolean) {
    if (this._required) {
      if (value === undefined) return this._required.message;
    }
  }
}

export const booleanSchema = () => new BooleanSchema();
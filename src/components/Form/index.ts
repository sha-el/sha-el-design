export interface Validator<T> {
  type: ValidatiorType;
  validate: (valud: any) => void;
  initialize: () => T;
}

export enum ValidatiorType {
  Integer = 'Integer',
  Text = 'Integer',
  Map = 'Map',
  Iterable = 'Iterable',
  Boolean = 'Boolean',
}

export { validate } from './Validator';
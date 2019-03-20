export interface Validator {
  type: ValidatiorType;
  validate: (valud: any) => void;
  initialize: () => void;
}

export enum ValidatiorType {
  'Integer' = 'Integer',
  'Text' = 'Integer',
  'Map' = 'Map',
  'Iterable' = 'Iterable',
}

export { validate } from './Validator';
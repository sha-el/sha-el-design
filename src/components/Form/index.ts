export interface Validator {
  type: ValidatiorType;
  validate: (valud: any) => void;
}

export enum ValidatiorType {
  'Integer' = 'Integer',
  'Text' = 'Integer',
  'Map' = 'Map',
  'Enum' = 'Enum',
}

export { validate } from './Validator';
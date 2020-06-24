import * as React from 'react';
import { BaseInputProps, BaseInputComponent } from './BaseInputComponent';

export type InputProps = Omit<BaseInputProps, 'children'>;

export const Input: React.FunctionComponent<Omit<InputProps, 'children'>> = (props) => {
  return (
    <BaseInputComponent {...props}>
      <input />
    </BaseInputComponent>
  );
};

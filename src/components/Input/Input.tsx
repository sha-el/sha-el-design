import * as React from 'react';
import { BaseInputProps, BaseInputComponent } from './BaseInputComponent';

export type InputProps = Omit<BaseInputProps, 'children'>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <BaseInputComponent {...props}>
    <input ref={ref} />
  </BaseInputComponent>
));

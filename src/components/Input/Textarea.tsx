import * as React from 'react';
import { BaseTextAreaProps, BaseInputComponent } from './BaseInputComponent';

export interface TextareaProps extends Omit<BaseTextAreaProps, 'children'> {
  children?: React.ReactElement;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <BaseInputComponent {...props} ref={ref}>
    <textarea>{props.children}</textarea>
  </BaseInputComponent>
));

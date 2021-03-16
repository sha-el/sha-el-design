import * as React from 'react';
import { BaseTextAreaProps, BaseInputComponent } from './BaseInputComponent';

export interface TextareaProps extends BaseTextAreaProps {
  children: React.ReactElement;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <BaseInputComponent {...props}>
    <textarea ref={ref}>{props.children}</textarea>
  </BaseInputComponent>
));

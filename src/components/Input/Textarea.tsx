import * as React from 'react';
import { BaseTextAreaProps, BaseInputComponent } from './BaseInputComponent';

export interface TextareaProps extends BaseTextAreaProps {
  children: React.ReactElement;
}

export const Textarea: React.FC<Omit<TextareaProps, 'children'>> = (props) => {
  return (
    <BaseInputComponent {...props}>
      <textarea>{props.children}</textarea>
    </BaseInputComponent>
  );
};

import * as React from 'react';
import { BaseTextAreaProps, BaseInputComponent } from './BaseInputComponent';

export interface TextareaProps extends BaseTextAreaProps {
  children: any;
}

export const Textarea: React.FunctionComponent<Omit<TextareaProps, 'children'>> = (props) => {
  return (
    <BaseInputComponent {...props}>
      <textarea>
        {props.children}
      </textarea>
    </BaseInputComponent>
  );
};

import * as React from 'react';
import { ButtonGroup } from '../Button';

import { RadioProps } from './Radio';

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (props) => {
  const { value, name, onChange, children } = props;
  return (
    <ButtonGroup>
      {children.map((v, i) =>
        React.cloneElement(v, {
          name,
          onChange,
          key: i,
          checked: v.props.value === value,
        }),
      )}
    </ButtonGroup>
  );
};

export interface RadioGroupProps {
  children: React.ReactElement<RadioProps>[];
  name: string;
  value?: string | boolean | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

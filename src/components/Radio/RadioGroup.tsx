import * as React from 'react';
import { style as typeStyle } from 'typestyle';

import { RadioProps } from './Radio';

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (props) => {
  const { value, name, onChange, children } = props;
  return (
    <div className={style}>
      {
        children.map((v, i) =>
          React.cloneElement(
            v,
            {
              name,
              onChange,
              key: i,
              checked: v.props.value === value,
            },
          ),
        )
      }
    </div>
  );
};

const style = typeStyle({
  $nest: {
    div: {
      display: 'inline-block',
      marginRight: '5px',
    },
  },
});

interface RadioGroupProps {
  children: React.ReactElement<RadioProps>[];
  name: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
import * as React from 'react';
import { style as typeStyle } from 'typestyle';

import { RadioProps } from './Radio';

export class RadioGroup extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, name, onChange, children } = this.props;
    return (
      <div className={this.style}>
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
  }

  style = typeStyle({
    $nest: {
      div: {
        display: 'inline-block',
        marginRight: '5px',
      },
    },
  });
}

interface Props {
  children: React.ReactElement<RadioProps>[];
  name: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
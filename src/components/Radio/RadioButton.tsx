import * as React from 'react';

import { Button } from '../Button';
import { RadioProps } from './Radio';
import { classes } from '../../helpers';
import { radioButtonStyle as style } from './style';

export const RadioButton: React.FunctionComponent<RadioProps> = (props) => {
  const { label, className, checked, disabled } = props;

  const input = React.useRef<HTMLInputElement>();

  const onContainerClick = () => {
    input.current?.click();
  };

  const css = style;
  return (
    <div style={{ display: 'inline' }} onClick={onContainerClick}>
      <input className={css} ref={input} type="radio" {...props} />
      <Button className={classes(className)} disabled={disabled} primary={checked || input.current?.checked}>
        {label}
      </Button>
    </div>
  );
};

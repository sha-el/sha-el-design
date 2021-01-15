import * as React from 'react';

import { Button } from '../Button';
import { RadioProps } from './Radio';
import { useTheme } from '../Theme/Theme';
import { nestedAccess } from '../../helpers';
import { radioButtonStyle as style } from './style';

export const RadioButton: React.FunctionComponent<RadioProps> = (props) => {
  const { label, className, error, checked, disabled } = props;

  const input = React.useRef<HTMLInputElement>();

  const onContainerClick = () => {
    if (input.current) {
      input.current.click();
    }
  };

  const theme = useTheme();
  const css = style(theme);
  return (
    <div style={{ display: 'inline' }} onClick={() => onContainerClick()}>
      <input className={css.radio} ref={input} type="radio" {...props} />
      <Button disabled={disabled} type={checked || nestedAccess(input.current, 'checked') ? 'primary' : 'default'}>
        {label}
      </Button>
      {error && (
        <div key="error" className={`${css.errorStyle} ${className || ''}`}>
          {error}
        </div>
      )}
    </div>
  );
};

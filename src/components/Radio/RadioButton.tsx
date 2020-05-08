import * as React from 'react';
import { stylesheet } from 'typestyle';

import { Button } from '../Button';
import { RadioProps } from './Radio';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { nestedAccess } from '../../helpers';

export const RadioButton: React.FunctionComponent<RadioProps> = (props) => {
  const { label, className, error, checked, disabled } = props;

  const input = React.useRef<HTMLInputElement>();

  const onContainerClick = () => {
    if (input.current) {
      input.current.click();
    }
  };

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(props.block, theme);
        return (
          <div onClick={() => onContainerClick()}>
            <input className={css.radio} ref={input} type='radio' {...props} />
            <Button disabled={disabled} type={(checked || nestedAccess(input.current, 'checked')) ? 'primary' : 'default'}>{label}</Button>
            {error &&
              <div key='error' className={`${css.errorStyle} ${className || ''}`}>
                {error}
              </div>
            }
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (block: boolean, theme: Theme) => {
  return stylesheet({
    errorStyle: {
      fontSize: '14px',
      color: theme.error,
    },
    radio: {
      display: 'none',
    },
  });
};

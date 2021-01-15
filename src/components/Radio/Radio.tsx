import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { radioStyle as style } from './style';

export const Radio: React.FunctionComponent<RadioProps> = (props) => {
  const { label, className, error } = props;
  const input = React.useRef<HTMLInputElement>();

  const onContainerClick = () => {
    if (input.current) {
      input.current.click();
    }
  };

  const theme = useTheme();
  const css = style({ disabled: props.disabled, block: props.block, theme });
  return (
    <div className={css.container} onClick={() => onContainerClick()}>
      <input className={css.radio} ref={input} type="radio" {...props} />
      <label className={`${css.label}`}>{label}</label>
      {error && (
        <div style={{ marginTop: '0' }} key="error" className={`${css.errorStyle} ${className || ''}`}>
          {error}
        </div>
      )}
    </div>
  );
};

export interface RadioProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  block?: boolean;
}

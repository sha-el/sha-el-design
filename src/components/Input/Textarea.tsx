import * as React from 'react';
import { classes } from 'typestyle';
import { nestedAccess } from '../../helpers';
import { ThemeConsumer } from '../Theme/Theme';
import {style} from './style';

export const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
  const [focused, setFocused] = React.useState(false);

  const textarea = React.useRef(null);
  const isTextAreaActive = () => {
    return !!(
      focused || props.value || props.defaultValue || nestedAccess(textarea.current, 'value')
      || props.placeholder || nestedAccess(textarea.current, 'placeholder')
    );
  };

  const {
      error,
      getElement,
      after,
      before,
      required,
      hint,
      label,
      containerStyle,
      containerClassName,
      ...rest
    } = props;

  return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(theme, !!error, !!label, isTextAreaActive());
          return(
          <>
            <div className={`${css.container} ${containerClassName}`} style={containerStyle}>
              {
                before &&
                <span
                  className={css.seudo}
                >
                  {before}
                </span>
              }
              <section
                key='textarea'
                className={css.section}
              >{label && <span
                key='label'
                className={classes(css.label, 'label')}
              >
                {label} {required && <span style={{ color: 'red' }}>*</span>}
              </span>}
                <textarea
                  className={css.textarea}
                  ref={(e) => {
                    getElement && getElement(e);
                    textarea.current = e;
                  }}
                  onFocus={(e) => {
                    props.onFocus && props.onFocus(e);
                    setFocused(true);
                  }}
                  onBlur={(e) => {
                    props.onBlur && props.onBlur(e);
                    setFocused(false);
                  }}
                  {...rest}
                />
              </section>
              {
                after &&
                <span
                  className={css.seudo}
                >
                  {after}
                </span>
              }
            </div>
            <div className={`${css.help}`}>
              {
                error &&
                <label
                  className={`${css.error}`}
                >
                  {error}
                </label>
              }
              {
                hint &&
                <label
                  className={`${css.hint}`}
                >
                  {hint}
                </label>
              }
            </div>
        </>
          );
        }}
      </ThemeConsumer>
    );

};

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  getElement?: (textarea: HTMLTextAreaElement) => void;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  label?: React.ReactNode;
}
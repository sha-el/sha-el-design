import * as React from 'react';
import { Omit, nestedAccess, classes } from '../../helpers';
import { Row, Col } from '../../';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const BaseInputComponent: React.FC<BaseInputProps | BaseTextAreaProps> = (props) => {
  const [focused, updateFocused] = React.useState(false);
  const {
    error,
    label,
    getElement,
    after,
    before,
    required,
    hint,
    containerStyle,
    containerClassName,
    children,
    borderless,
    ...rest
  } = props;

  const input = React.useRef(null);

  const isInputActive = () => {
    return !!(
      focused ||
      props.value ||
      props.defaultValue ||
      nestedAccess(input.current, 'value') ||
      props.placeholder ||
      nestedAccess(input.current, 'placeholder') ||
      props.before
    );
  };

  const theme = useTheme();
  const css = style({
    theme,
    error: !!error,
    label: !!label,
    active: isInputActive(),
    borderless: borderless || false,
    disabled: props.disabled || false,
    before: !!before,
    props: props,
  });

  return (
    <>
      <Row
        style={containerStyle}
        alignItems="center"
        gutter={[0, 0]}
        className={classes(containerClassName, css.container, 'sha-el-input')}
      >
        {label && (
          <span key="label" className={classes(css.label, 'label')}>
            {label} {required && <span style={{ color: 'red' }}>*</span>}
          </span>
        )}
        {before && (
          <Col
            style={{ paddingLeft: (!borderless && '5px') || undefined }}
            flex="0 1 auto"
            className={classes(css.seudo, 'seudo')}
          >
            {before}
          </Col>
        )}
        <Col flex="1 0 auto">
          {React.cloneElement(children, {
            className: css.input,
            required,
            ref: (e) => {
              getElement && getElement(e);
              input.current = e;
              return e;
            },
            onFocus: (e) => {
              props.onFocus && props.onFocus(e);
              updateFocused(true);
            },
            onBlur: (e) => {
              props.onBlur && props.onBlur(e);
              updateFocused(false);
            },
            ...rest,
          })}
        </Col>
        {after && (
          <Col
            style={{ paddingRight: (!borderless && '5px') || undefined }}
            flex="0 1 auto"
            className={classes(css.seudo, 'seudo')}
          >
            {after}
          </Col>
        )}
        {(error || hint) && (
          <div className={classes(css.help, 'help')}>
            {error && <label className={`${css.error}`}>{error}</label>}
            {hint && <label className={`${css.hint}`}>{hint}</label>}
          </div>
        )}
      </Row>
    </>
  );
};

export interface Props {
  label?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  borderless?: boolean;

  getElement?: (input: HTMLInputElement) => void;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  children: React.ReactElement;
}

export interface BaseInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>, Props {
  children: React.ReactElement;
}

export interface BaseTextAreaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    Props {
  children: React.ReactElement;
}

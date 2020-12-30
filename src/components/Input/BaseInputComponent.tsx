import * as React from 'react';
import { classes } from 'typestyle';
import { Omit, nestedAccess } from '../../helpers';
import { Row, Col } from '../../';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const BaseInputComponent: React.FunctionComponent<BaseInputProps | BaseTextAreaProps> = (props) => {
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
    borderLess,
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
    borderLess: borderLess || false,
    disabled: props.disabled || false,
    before: !!before,
  });

  return (
    <>
      <Row
        wrap="wrap"
        gutter={[0, 0]}
        className={classes(css.container, containerClassName, 'sha-el-input')}
        style={containerStyle}
      >
        {before && (
          <Col
            className={classes(css.seudo, 'seudo')}
            flex="0 1 auto"
            style={{ paddingLeft: (!borderLess && '5px') || undefined }}
          >
            {before}
          </Col>
        )}
        {label && (
          <span key="label" className={classes(css.label, 'label')}>
            {label} {required && <span style={{ color: 'red' }}>*</span>}
          </span>
        )}
        <Col flex="1 0 auto">
          <section key="textarea" className={css.section}>
            <Row gutter={['0', '0']}>
              <Col key="input" flex="1 0 auto">
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
                  className={classes(css.seudo, 'seudo')}
                  flex="0 1 auto"
                  style={{ paddingRight: (!borderLess && '5px') || undefined }}
                >
                  {after}
                </Col>
              )}
            </Row>
          </section>
        </Col>
      </Row>
      {(error || hint) && (
        <div className={classes(css.help, 'help')}>
          {error && <label className={`${css.error}`}>{error}</label>}
          {hint && <label className={`${css.hint}`}>{hint}</label>}
        </div>
      )}
    </>
  );
};

export interface Props {
  label?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  borderLess?: boolean;

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

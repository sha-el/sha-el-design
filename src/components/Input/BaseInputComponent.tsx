import * as React from 'react';
import { Omit, nestedAccess, classes } from '../../helpers';
import { Row, Col } from '../../';
import { useTheme } from '../Theme/Theme';
import { style } from './style';
import { Text } from '../Text';

export const BaseInputComponent: React.FC<BaseInputProps | BaseTextAreaProps> = (props) => {
  const [focused, updateFocused] = React.useState(false);
  const {
    error,
    label,
    getElement,
    onFocus,
    onBlur,
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

  const ShouldHover = () => {
    return !(focused || error);
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
    hover: ShouldHover(),
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
          <label key="label" className={classes(css.label, 'label')}>
            {label} {required && <span style={{ color: 'red' }}>*</span>}
          </label>
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
            ref: (e: HTMLInputElement) => {
              getElement && getElement(e);
              input.current = e;
              return e;
            },
            onFocus: (e: React.FocusEvent<HTMLInputElement> & React.FocusEvent<HTMLTextAreaElement>) => {
              onFocus && onFocus(e);
              updateFocused(true);
            },
            onBlur: (e: React.FocusEvent<HTMLInputElement> & React.FocusEvent<HTMLTextAreaElement>) => {
              onBlur && onBlur(e);
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
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            <span>{label}</span>
          </legend>
        </fieldset>
      </Row>
      {(error !== undefined || hint !== undefined) && (
        <Row
          justifyContent="flex-end"
          gutter={[0, `0 ${borderless ? '0' : before ? '5px' : '14px'}`]}
          className={classes(css.help, 'help')}
        >
          {error && (
            <Col flex="1 0 auto">
              <Text variant="label" className={`${css.error}`}>
                {error}
              </Text>
            </Col>
          )}
          {hint && (
            <Col flex="0 1 auto">
              <Text variant="label" className={`${css.hint}`}>
                {hint}
              </Text>
            </Col>
          )}
        </Row>
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

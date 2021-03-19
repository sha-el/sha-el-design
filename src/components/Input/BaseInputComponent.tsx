import * as React from 'react';
import { Omit, classes } from '../../helpers';
import { Row, Col } from '../../';
import { useTheme } from '../Theme/Theme';
import { style } from './style';
import { Text } from '../Text';

function useCombinedRefs(...refs: React.Ref<HTMLInputElement | HTMLTextAreaElement>[]) {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref.current as typeof targetRef.current) = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export const BaseInputComponent = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, BaseInputProps>(
  (props, ref) => {
    const [focused, updateFocused] = React.useState(false);
    const {
      error,
      label,
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
    const combinedRef = useCombinedRefs(ref, input);

    const isInputActive = () => {
      return !!(
        focused ||
        props.value ||
        props.defaultValue ||
        input.current?.value ||
        input.current?.defaultValue ||
        props.placeholder ||
        input.current?.placeholder ||
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
          wrap="wrap"
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
              ref: combinedRef,
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
  },
);

export interface Props {
  label?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  borderless?: boolean;

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

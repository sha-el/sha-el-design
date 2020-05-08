import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { Omit, nestedAccess, getColor } from '../../helpers';
import { Row, Col } from '../../';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { lightText, borderColor as borderColorHelper } from '../../helpers/color';

export const Input: React.FunctionComponent<InputProps> = (props) => {
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
    ...rest
  } = props;

  const input = React.useRef(null);

  const isInputActive = () => {
    return !!(
      focused || props.value || props.defaultValue || nestedAccess(input.current, 'value')
      || props.placeholder || nestedAccess(input.current, 'placeholder') || props.before
    );
  };

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme, !!error, !!label, isInputActive());
        return (
          <>
            <Row wrap='nowrap' gutter={[0, 0]} className={classes(css.container, containerClassName)} style={containerStyle}>
              {
                before &&
                <Col
                  className={classes(css.seudo, 'seudo')}
                  flex='0 1 auto'
                  style={{ paddingLeft: '15px' }}
                >
                  {before}
                </Col>
              }
              {label && <span
                key='label'
                className={classes(css.label, 'label')}
              >
                {label} {required && <span style={{ color: 'red' }}>*</span>}
              </span>}
              <Col
                key='input'
                flex='1 1 auto'
              >
                <input
                  className={css.input}
                  required={required}
                  ref={(e) => {
                    getElement && getElement(e);
                    input.current = e;
                    return e;
                  }}
                  onFocus={(e) => {
                    props.onFocus && props.onFocus(e);
                    updateFocused(true);
                  }}
                  onBlur={(e) => {
                    props.onBlur && props.onBlur(e);
                    updateFocused(false);
                  }}
                  {...rest}
                />
              </Col>
              {
                after &&
                <Col
                  className={classes(css.seudo, 'seudo')}
                  flex='0 1 auto'
                  style={{ paddingRight: '15px' }}
                >
                  {after}
                </Col>
              }
            </Row>
            {(error || hint) && <div className={`${css.help}`}>
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
            </div>}
          </>
        );
      }}
    </ThemeConsumer>
  );
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  getElement?: (input: HTMLInputElement) => void;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

function style(theme: Theme, isError: boolean, label: boolean, active: boolean) {
  const borderColor = isError ? theme.error : borderColorHelper(theme.background);
  return stylesheet({
    container: {
      position: 'relative',
      color: lightText(theme),
      fontSize: '14px',
      lineHeight: 1.12857,
      borderWidth: '1px',
      borderColor,
      borderRadius: '4px',
      borderStyle: 'solid',
      cursor: 'text',
      borderTop: (active && label) && 'none',
      transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      $nest: {
        '&:focus-within': {
          borderColor: theme.primary,
          background: theme.background,

          $nest: {
            '.seudo': {
              color: theme.primary,
            },
            '.label': {
              color: theme.primary,
            },
            '*': {
              $nest: {
                '&::after, &::before': {
                  borderColor: theme.primary,
                },
              },
            },
          },
        },
        '&:hover': {
          borderColor: !active && 'rgb(9, 30, 66)',
        },
      },
    },
    input: {
      fontSize: '16px',
      width: '100%',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
      lineHeight: '12px',
      padding: '15px',
      color: getColor(theme.background),
      boxSizing: 'border-box',
      $nest: {
        '&::placeholder': {
          color: '#aaaaaa',
        },
      },
    },
    label: {
      position: 'absolute',
      display: 'flex',
      alignSelf: 'center',
      color: lightText(theme),
      boxSizing: 'border-box',
      left: 0,
      top: -7,
      height: '100%',
      pointerEvents: 'none',
      transition: 'line-height 0.2s',
      $nest: {
        '&::after, &::before': {
          content: `''`,
          display: 'block',
          boxSizing: 'border-box',
          marginTop: '6px',
          borderTop: 'solid 1px',
          borderTopColor: active ? borderColor : 'transparent',
          minWidth: '10px',
          height: '8px',
          pointerEvents: 'none',
          boxShadow: 'inset 0 1px transparent',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        },
        '&::before': {
          marginRight: '4px',
          borderTopLeftRadius: '4px',
        },
        '&::after': {
          flexGrow: 1,
          marginLeft: '4px',
          borderTopRightRadius: '4px',
        },
      },
      ...(active ? {
        fontSize: '10px',
        fontWeight: 400,
        lineHeight: '14px',
        width: '100%',
      } : {
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: '58px',
        }),
    },
    help: {
      width: '100%',
      marginBottom: '20px',
      display: 'flex',
      placeContent: 'space-between',
      fontSize: '12px',
    },
    hint: {
      color: '#aaaaaa',
      padding: '0 5px',
    },
    error: {
      color: theme.error,
      padding: '0 5px',
    },
    seudo: {
      display: 'flex',
      alignItems: 'center',
    },
  });
}

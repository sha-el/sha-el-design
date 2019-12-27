import * as React from 'react';
import { stylesheet } from 'typestyle';
import { ThemeService, Theme } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';
import { Omit, nestedAccess } from '../../helpers';

export class Input extends React.Component<InputProps, State> {

  static defaultProps = {
    containerClassName: '',
    containerStyle: {},
  };

  theme = new ThemeService();
  input: HTMLInputElement;

  constructor(props: InputProps) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
      focused: false,
    };
  }

  get isInputActive() {
    return !!(
      this.state.focused || this.props.value || this.props.defaultValue || nestedAccess(this.input, 'value')
      || this.props.placeholder || nestedAccess(this.input, 'placeholder')
    );
  }

  render() {
    const {
      error,
      label,
      getElement,
      after,
      before,
      required,
      hint,
    } = this.props;

    const {
      containerStyle,
      containerClassName,
      ...rest
    } = this.props;

    const css = style(this.state.theme, !!error, !!before, this.isInputActive);
    return (
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
            key='input'
            className={css.section}
          >
            <label
              key='label'
              className={css.label}
            >
              {label} {required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <input
              className={css.input}
              ref={(e) => {
                getElement && getElement(e);
                this.input = e;
              }}
              onFocus={(e) => {
                this.props.onFocus && this.props.onFocus(e);
                this.setState({ focused: true });
              }}
              onBlur={(e) => {
                this.props.onBlur && this.props.onBlur(e);
                this.setState({ focused: false });
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
  }
}

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

interface State {
  theme: Theme;
  focused: boolean;
}

function style(theme: Theme, isError: boolean, before: boolean, active: boolean) {
  const borderColor = isError ? theme.error : 'rgba(0,0,0,.24)';
  return stylesheet({
    container: {
      display: 'flex',
      padding: '6px',
      marginBottom: '24px',
      boxSizing: 'border-box',
      color: 'rgb(9, 30, 66)',
      fontSize: '14px',
      justifyContent: 'space-between',
      lineHeight: 1.42857,
      maxWidth: '100%',
      overflowWrap: 'break-word',
      borderWidth: '1px',
      borderColor,
      borderRadius: '4px',
      borderStyle: 'solid',
      cursor: 'text',

      $nest: {
        '*': {
          color: borderColor,
          transition: '.2s all',
        },
        '&:focus-within': {
          borderColor: theme.primary,
          background: '#ffffff',

          $nest: {
            '*:not(input)': {
              color: theme.primary,
            },
          },
        },
        '&:hover': {
          borderColor: 'rgb(9, 30, 66)',
        },
      },
    },
    section: {
      position: 'relative',
      boxSizing: 'border-box',
      color: 'rgb(9, 30, 66)',
      display: 'flex',
      fontSize: '14px',
      justifyContent: 'space-between',
      lineHeight: 1.42857,
      maxWidth: '100%',
      flex: '1 0 auto',
      transition: 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      borderWidth: '1px',
    },
    input: {
      fontSize: '16px',
      minWidth: '0px',
      width: '100%',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
      flex: '1 1 auto',
      lineHeight: '20px',
      padding: '8px 5px',
      maxWidth: '100%',
      color: '#090909',
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
      color: 'rgb(107, 119, 140)',
      boxSizing: 'border-box',
      transition: '.4s all',
      left: 0,
      right: 'auto',
      transformOrigin: 'top left',
      background: 'white',
      zIndex: 1000,
      pointerEvents: 'none',
      ...(active ? {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.33333,
        transform: 'translateY(-25px)',
        left: before ? '-21px' : '5px',
      } : {
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.33333,
          top: 'auto',
        }),
    },
    help: {
      width: '100%',
      marginTop: '-20px',
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
      padding: '0 .4em',
    },
  });
}

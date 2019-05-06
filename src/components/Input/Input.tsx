import * as React from 'react';
import { style as typeStyle, stylesheet } from 'typestyle';
import { ThemeService, Theme } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';
import * as csstips from 'csstips';
import { removeObjectProperties, nestedAccess, Omit } from '../../helpers';

export class Input extends React.Component<InputProps, State> {

  theme = new ThemeService();

  constructor(props: InputProps) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
      focused: false,
    };
  }

  render() {
    const {
      error,
      label,
      getElement,
      after,
      before,
      required,
    } = this.props;

    const css = style(this.state.theme, !!error);
    return (
      <div>
        <label
          key='label'
          className={css.label}
        >
          {label} {required && '*'}
        </label>
        <section
          key='input'
          className={css.section}
        >
          {
            before &&
            <span
              className={css.seudo}
            >
              {before}
            </span>
          }
          <input
            className={css.input}
            ref={(e) => getElement && getElement(e)}
            {...this.props}
          />
          {
            after &&
            <span
              className={css.seudo}
            >
              {after}
            </span>
          }
        </section>
        {
          error &&
          <label
            className={`${css.label} ${css.error}`}
          >
            {error}
          </label>
        }
      </div>
    );
  }
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
  getElement?: (input: HTMLInputElement) => void;
}

interface State {
  theme: Theme;
  focused: boolean;
}

function style(theme: Theme, isError: boolean) {
  const borderColor = isError ? theme.error : styleEnum.borderColor;
  return stylesheet({
    section: {
      '-webkit-box-align': 'center',
      'alignItems': 'center',
      'background': 'rgb(250, 251, 252)',
      'boxSizing': 'border-box',
      'color': 'rgb(9, 30, 66)',
      'display': 'flex',
      'fontSize': '14px',
      '-webkit-box-pack': 'justify',
      'justifyContent': 'space-between',
      'lineHeight': 1.42857,
      'maxWidth': '100%',
      'overflowWrap': 'break-word',
      'borderColor': borderColor,
      'borderRadius': '3px',
      'borderStyle': 'solid',
      'flex': '1 0 auto',
      'overflow': 'hidden',
      'transition': 'background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s',
      'borderWidth': '2px',
      'padding': '6px',

      '$nest': {
        '&:focus-within': {
          borderColor: theme.primary,
          background: '#ffffff',
        },
      },
    },
    input: {
      fontSize: '14px',
      minWidth: '0px',
      width: '100%',
      background: 'transparent',
      borderWidth: '0px',
      borderStyle: 'initial',
      borderColor: 'initial',
      borderImage: 'initial',
      outline: 'none',
    },
    label: {
      color: 'rgb(107, 119, 140)',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.33333,
    },
    error: {
      color: theme.error,
      float: 'right',
    },
    seudo: {
      padding: '0 5px',
      display: 'flex',
      alignItems: 'center',
    },
  });
}

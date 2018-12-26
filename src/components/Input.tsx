import * as React from 'react';
import { style as typeStyle, stylesheet } from 'typestyle';
import { ThemeService, Theme } from '../helpers/theme';
import { styleEnum } from '../helpers/constants';
import * as csstips from 'csstips';
import { removeObjectProperties, nestedAccess } from '../helpers';

export class Input extends React.Component<InputProps, State> {
  theme = new ThemeService();
  input: HTMLInputElement;
  css = css.bind(this);

  constructor(props: InputProps) {
    super(props);
    this.state = {
      theme: this.theme.selectedTheme$.getValue(),
      focused: false,
    };
  }

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: true });
    this.props.onFocus && this.props.onFocus(e);
  }

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: false });
    this.props.onBlur && this.props.onBlur(e);
  }

  renderInput = () => {
    const styleSheet = this.css();
    const {
      before,
      after,
    } = this.props;
    const props = removeObjectProperties(this.props, 'label', 'before', 'after', 'error');
    const child = (
      <input
        {...props}
        key='input'
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={`${this.css().inputStyle} ${this.props.className || ''}`}
        ref={(e) => {
          this.input = e;
        }}
      />
    );
    if (!(after || before)) {
      return (
        child
      );
    }

    return (
      <div
        {...props}
        className={typeStyle(csstips.horizontal)}
        key={'input-container'}
      >
        <div className={styleSheet.suedoElementStyle}>
          {this.props.before}
        </div>
        <div className={typeStyle(csstips.flex)}>
          {React.cloneElement(child, { style: null, className: styleSheet.inputStyle })}
        </div>
        <div className={styleSheet.suedoElementStyle}>
          {this.props.after}
        </div>
      </div>
    );
  }

  render() {
    const { label, required, error } = this.props;
    const styleSheet = this.css();
    return ([
      (label && <div key='label' style={this.props.style} className={this.props.className || ''}>{label}{required && '*'}</div>),
      this.renderInput(),
      (<div key='border' className={`${styleSheet.borderColor} ${styleSheet.bottomBorderStyle}`} />),
      (error &&
        (
          <div style={{ ...this.props.style, marginTop: '0' }} key='error' className={`${styleSheet.errorStyle} ${this.props.className || ''}`}>
            {error}
          </div>
        )),
    ]);
  }
}

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  error?: React.ReactNode;
}

interface State {
  theme: Theme;
  focused: boolean;
}

function css() {
  const isFocused = this.state.focused || this.props.value;
  const borderColor = this.props.error ? this.state.theme.error : this.state.focused ? this.state.theme.primary : styleEnum.borderColor;
  const baseStyle = {
    boxShadow: styleEnum.shadow,
  };

  return stylesheet({
    inputStyle: {
      background: !this.state.focused && styleEnum.background || '#fff',
      border: `none`,
      width: '100%',
      padding: '5px 2px',
      borderRadius: '1px',
      boxSizing: 'border-box',
      $nest: {
        '&:focus': {
          outline: 'none',
        },
        '&::placeholder': {
          color: this.state.theme.primary,
        },
      },
      ...baseStyle,
    },

    borderColor: {
      border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${(borderColor)}`,
      width: isFocused || this.props.value ? nestedAccess(this.props, 'style', 'width') || '100%' : '0',
    },

    bottomBorderStyle: {
      transition: '1s',
    },

    suedoElementStyle: {
      ...csstips.content,
      padding: '5px', background: styleEnum.background,
      ...baseStyle,
    },

    errorStyle: {
      textAlign: 'right',
      fontSize: '10px',
      color: this.state.theme.error,
    },
  });
}

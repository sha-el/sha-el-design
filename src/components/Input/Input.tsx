import * as React from 'react';
import { style as typeStyle, stylesheet } from 'typestyle';
import { ThemeService, Theme } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';
import * as csstips from 'csstips';
import { removeObjectProperties, nestedAccess, Omit } from '../../helpers';

export class Input extends React.Component<InputProps, State> {
  private readonly theme = new ThemeService();
  input = React.createRef<HTMLInputElement>();
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
      getElement,
      label,
      required,
    } = this.props;
    const props = removeObjectProperties(this.props, 'label', 'before', 'after', 'error', 'getElement');
    const child = (
      <input
        {...props}
        key='input'
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={`${this.css().inputStyle} ${this.props.className || ''}`}
        ref={this.input}
      />
    );
    if (!(after || before)) {
      return (
        child
      );
    }
    getElement && getElement(this.input.current);
    return (
      <div
        {...props}
        className={typeStyle(csstips.horizontal)}
        key={'input-container'}
      >
        {this.props.before && <div className={styleSheet.suedoElementStyle}>
          <span>{this.props.before}</span>
        </div>}
        <div className={typeStyle(csstips.flex)}>
          {label &&
            <div key='label' className={`${styleSheet.label}`}>{label}{required && '*'}</div>}
          {React.cloneElement(child, { style: null, className: styleSheet.inputStyle })}
        </div>
        {this.props.after && <div className={styleSheet.suedoElementStyle}>
          <span>{this.props.after}</span>
        </div>}
      </div>
    );
  }

  render() {
    const { label, required, error, before, after } = this.props;
    const styleSheet = this.css();
    return (
      <div style={this.props.style} className={styleSheet.container}>
        {label && !(before || after) &&
          <div key='label' className={`${styleSheet.label}`}>{label}{required && '*'}</div>}
        {this.renderInput()}
        {<div key='border' className={`${styleSheet.borderColor} ${styleSheet.bottomBorderStyle}`} />}
        {error &&
          <div style={{ marginTop: '0' }} key='error' className={`${styleSheet.errorStyle} ${this.props.className || ''}`}>
            {error}
          </div>
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

function css() {
  const isFocused = this.state.focused || this.props.value;
  const borderColor = this.props.error ? this.state.theme.error : this.state.focused ? this.state.theme.primary : styleEnum.borderColor;
  const psuedoElem = !!(this.props.before || this.props.after);
  const baseStyle = {
    boxShadow: styleEnum.shadow_bot,
  };

  return stylesheet({
    inputStyle: {
      border: `none`,
      width: '100%',
      boxSizing: 'border-box',
      caretColor: this.state.theme.primary,
      fontSize: '16px',
      $nest: {
        '&:focus': {
          outline: 'none',
        },
        '&::placeholder': {
          color: this.state.theme.primary,
        },
      },
      ...baseStyle,
      lineHeight: (!this.props.label && psuedoElem) ? '34px' : 'initial',
    },

    container: {
      margin: '10px 0',
      fontWeight: 'lighter',
      boxShadow: styleEnum.shadow_bot,
    },

    label: {
      fontSize: isFocused ? '14px' : '16px',
      color: 'rgba(0,0,0,.54)',
      transition: 'all .5s',
      transform: isFocused ? 'translate3d(0, -12px, 0)' : 'translate3d(0, 10px, 0)',
      pointerEvents: 'none',
      cursor: 'text',
    },

    borderColor: {
      border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${(borderColor)}`,
      width: (isFocused || this.props.error) ? nestedAccess(this.props, 'style', 'width') || '100%' : '0',
      margin: 'auto',
    },

    bottomBorderStyle: {
      transition: '1s',
    },

    suedoElementStyle: {
      padding: '10px',
      background: styleEnum.headerBgColor,
      fontSize: '14px',
      border: '.3px solid #eee',
      ...baseStyle,
    },

    errorStyle: {
      textAlign: 'right',
      fontSize: '14px',
      color: this.state.theme.error,
    },
  });
}

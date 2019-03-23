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
          {React.cloneElement(child, { style: null, className: styleSheet.inputStyle })}
        </div>
        {this.props.after && <div className={styleSheet.suedoElementStyle}>
          <span>{this.props.after}</span>
        </div>}
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
  const baseStyle = {
    boxShadow: styleEnum.shadow_bot,
    margin: '10px 0 0',
  };

  return stylesheet({
    inputStyle: {
      border: `none`,
      width: '100%',
      padding: '10px 2px',
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
    },

    borderColor: {
      border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${(borderColor)}`,
      width: (isFocused || this.props.error) ? nestedAccess(this.props, 'style', 'width') || '100%' : '0',
    },

    bottomBorderStyle: {
      transition: '1s',
    },

    suedoElementStyle: {
      ...csstips.content,
      padding: '10px',
      background: '#fafafa',
      fontSize: '14px',
      border: '.3px solid #eee',
      ...baseStyle,
      alignSelf: 'center',
    },

    errorStyle: {
      textAlign: 'right',
      fontSize: '14px',
      color: this.state.theme.error,
    },
  });
}

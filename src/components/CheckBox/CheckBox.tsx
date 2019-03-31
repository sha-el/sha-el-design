import * as React from 'react';
import { stylesheet } from 'typestyle';
import * as csstips from 'csstips';
import { Theme, ThemeService } from './../../helpers/theme';
import { styleEnum } from './../../helpers/constants';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { nestedAccess } from './../../helpers';

export class CheckBox extends React.Component<CheckBoxProps, State> {
  private readonly theme = new ThemeService();
  input = React.createRef<HTMLInputElement>();

  constructor(props) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
    };
  }

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  onContainerClick = () => {
    if (this.input.current) {
      this.input.current.click();
    }
  }

  render() {
    const style = this.css();
    const { label, className, error, checked } = this.props;
    return (
      <div className={style.container} onClick={() => this.onContainerClick()}>
        <div className={`${style.child} ${style.checkbox}`}>
          {checked ? <FaCheck style={{ color: '#ffffff', margin: '3px' }} /> : <FaTimes style={{ color: '#ff0000', margin: '3px' }} />}
        </div>
        <div className={`${style.child} ${style.label}`}>{label}</div>
        {<div key='border' className={`${style.borderColor} ${style.bottomBorderStyle}`} />}
        {error &&
          <div style={{ marginTop: '0' }} key='error' className={`${style.errorStyle} ${className || ''}`}>
            {error}
          </div>
        }
        <input ref={this.input} type='checkbox' {...this.props} style={{ display: 'none' }} />
      </div>
    );
  }

  css = () => {
    const isFocused = this.props.value;
    const borderColor = this.props.error ? this.state.theme.error : styleEnum.borderColor;

    return stylesheet({
      container: {
        cursor: 'pointer',
        margin: '10px 0',
        fontWeight: 'lighter',
        boxShadow: styleEnum.shadow_bot,
        lineHeight: '22px',
      },
      child: {
        display: 'inline-flex',
      },
      checkbox: {
        background: this.props.checked ? this.state.theme.primary : '#ffffff',
        width: '20px',
        height: '20px',
        marginRight: '10px',
        border: '1px solid ' + this.state.theme.primary,
        transition: 'all 1s',
      },
      label: {
        color: 'rgba(0,0,0,.54)',
        transition: 'all .5s',
        pointerEvents: 'none',
        fontSize: '16px',
      },

      errorStyle: {
        textAlign: 'right',
        fontSize: '14px',
        color: this.state.theme.error,
      },

      borderColor: {
        border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${(borderColor)}`,
        width: (isFocused || this.props.error) ? nestedAccess(this.props, 'style', 'width') || '100%' : '0',
        margin: 'auto',
      },

      bottomBorderStyle: {
        transition: '1s',
      },
    });
  }
}

export interface CheckBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
}

interface State {
  theme: Theme;
}
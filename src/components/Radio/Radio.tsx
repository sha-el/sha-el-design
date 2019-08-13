import * as React from 'react';
import { stylesheet } from 'typestyle';
import { Theme, ThemeService } from './../../helpers/theme';
import { styleEnum } from './../../helpers/constants';

export class Radio extends React.Component<RadioProps, State> {
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
    const { label, className, error } = this.props;
    return (
      <div className={style.container} onClick={() => this.onContainerClick()}>
        <input className={style.radio} ref={this.input} type='radio' {...this.props} />
        <label className={`${style.label}`}>{label}</label>
        {error &&
          <div style={{ marginTop: '0' }} key='error' className={`${style.errorStyle} ${className || ''}`}>
            {error}
          </div>
        }
      </div>
    );
  }

  css = () => {
    const { disabled } = this.props;
    const backgroundColor = this.state.theme.primary;

    return stylesheet({
      container: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        margin: '10px 0',
        fontWeight: 'lighter',
        boxShadow: this.props.block && styleEnum.shadow_bot,
        lineHeight: '22px',
      },
      label: {
        color: 'rgba(0,0,0,.54)',
        transition: 'all .5s',
        pointerEvents: 'none',
        fontSize: '16px',
        marginLeft: '30px',
        position: 'relative',
        $nest: {
          '&::before': {
            cursor: 'pointer',
            content: '""',
            border: `1px solid ${backgroundColor}`,
            position: 'absolute',
            borderRadius: '50%',
            left: '-23px',
            top: '0',
            width: '16px',
            height: '16px',
            zIndex: 0,
            transition: '.4s ease',
            background: `linear-gradient(to bottom, white 50%, ${backgroundColor} 50%)`,
            backgroundSize: '100% 200%',
            backgroundPosition: 'left top',
          },
          '&::after': {
            content: '""',
            cursor: 'pointer',
            position: 'absolute',
            left: '0',
            top: '0',
            margin: '4px',
            width: '16px',
            height: '16px',
            zIndex: 0,
            transition: '.28s ease',
          },
        },
      },
      errorStyle: {
        textAlign: 'right',
        fontSize: '14px',
        color: this.state.theme.error,
      },
      radio: {
        display: 'none',
        $nest: {
          '&:checked': {
            $nest: {
              '& ~ label:before': {
                backgroundPosition: 'right bottom',
              },
            },
          },
          '&:disabled': {
            color: styleEnum.borderColor,
            $nest: {
              '& ~ label:before': {
                border: `1px solid ${styleEnum.borderColor}`,
                background: `linear-gradient(to bottom, white 50%, ${styleEnum.borderColor} 50%)`,
                backgroundPosition: 'right bottom',
              },
            },
          },
        },
      },
    });
  }
}

export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  block?: boolean;
}

interface State {
  theme: Theme;
}
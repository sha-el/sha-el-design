import * as React from 'react';
import { stylesheet } from 'typestyle';
import { Theme, ThemeService } from './../../helpers/theme';
import { styleEnum } from './../../helpers/constants';
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
    const { label, className, error } = this.props;
    return (
      <div className={style.container} onClick={() => this.onContainerClick()}>
        <input className={style.checkbox} ref={this.input} type='checkbox' {...this.props} />
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
    const backgroundColor = this.state.theme.primary;

    return stylesheet({
      container: {
        cursor: 'pointer',
        margin: '10px 0',
        fontWeight: 'lighter',
        boxShadow: styleEnum.shadow_bot,
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
            border: '1px solid ' + backgroundColor,
            position: 'absolute',
            left: '-23px',
            top: '0',
            width: '16px',
            height: '16px',
            zIndex: 0,
            transition: '.4s ease',
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
      checkbox: {
        display: 'none',
        $nest: {
          '&:checked': {
            $nest: {
              '& ~ label:after': {
                content: '""',
                cursor: 'pointer',
                position: 'absolute',
                left: '-23px',
                top: '0',
                margin: '4px',
                width: '16px',
                height: '16px',
                zIndex: 0,
                transition: '.28s ease',
              },
              '& ~ label:before': {
                borderTop: '1px solid transparent',
                borderLeft: '1px solid transparent',
                borderRight: '1px solid ' + backgroundColor,
                borderBottom: '1px solid ' + backgroundColor,
                display: 'inline-block',
                transform: 'rotateZ(390deg)',
                top: '0',
                left: '-23px',
                width: '8px',
                transformOrigin: '100% 100%',
              },
            },
          },
        },
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
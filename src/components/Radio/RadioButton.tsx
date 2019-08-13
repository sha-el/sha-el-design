import * as React from 'react';
import { stylesheet } from 'typestyle';
import { Theme, ThemeService } from './../../helpers/theme';
import { styleEnum } from './../../helpers/constants';

import { Button } from '../Button';
import { RadioProps } from './Radio';

export class RadioButton extends React.Component<RadioProps, State> {
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
    const { label, className, error, checked, disabled } = this.props;
    return (
      <div className={style.container} onClick={() => this.onContainerClick()}>
        <input className={style.radio} ref={this.input} type='radio' {...this.props} />
        <Button disabled={disabled} type={checked ? 'primary' : 'default'}>{label}</Button>
        {error &&
          <div style={{ marginTop: '0' }} key='error' className={`${style.errorStyle} ${className || ''}`}>
            {error}
          </div>
        }
      </div>
    );
  }

  css = () => {

    return stylesheet({
      container: {
        cursor: 'pointer',
        fontWeight: 'lighter',
        boxShadow: this.props.block && styleEnum.shadow_bot,
        lineHeight: '22px',
      },
      errorStyle: {
        textAlign: 'right',
        fontSize: '14px',
        color: this.state.theme.error,
      },
      radio: {
        display: 'none',
      },
    });
  }
}

interface State {
  theme: Theme;
}
import * as React from 'react';
import { stylesheet } from 'typestyle';
import { color } from 'csx';

import { styleEnum } from '../../helpers/constants';
import { Divider } from '../Divider';
import { Theme, ThemeService } from '../../helpers/theme';
import { getColor } from '../../helpers';

export class Card extends React.Component<CardProps, State> {

  themeService = new ThemeService();

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      theme: this.themeService.selectedTheme$.getValue(),
    };
  }

  componentDidMount() {
    this.themeService.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  render() {
    const { title, subtitle, children, footer, style: { head, body, container } } = this.props;
    const style = this.css();
    return (
      <div className={style.container} style={container}>
        {(title || subtitle) &&
          <div className={style.header} style={head}>
            {title}
            <div className={style.subtitle}>{subtitle}</div>
          </div>
        }
        <div className={style.body} style={body}>
          {children}
        </div>
        {footer && <div className={style.footer}>
          <Divider className={style.divider} />
          {footer}
        </div>}
      </div>
    );
  }

  css = () => stylesheet({
    container: {
      boxShadow: styleEnum.shadow_bot_2x,
      border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
      padding: 0,
      margin: '10px',
      background: 'white',
      marginTop: '40px',
    },
    header: {
      fontSize: '20px',
      fontWeight: 'bold',
      borderRadius: '3px',
      marginTop: '-20px',
      margin: '0 15px',
      padding: '15px',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px ' + color(this.state.theme.secondary).darken(.3),
      zIndex: 3,
      color: getColor(this.state.theme.secondary),
      background: `linear-gradient(60deg, ${this.state.theme.secondary},
        ${color(this.state.theme.secondary).darken(.05)})`,
    },
    subtitle: {
      fontSize: '12px',
      fontWeight: 400,
    },
    divider: {
      margin: '0px 0 10px',
    },
    body: {
      padding: '10px',
      marginTop: '10px',
    },
    footer: {
      padding: '10px',
    },
  })
}

interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  style?: {
    container?: React.CSSProperties;
    head?: React.CSSProperties;
    body?: React.CSSProperties;
  };
}

interface State {
  theme: Theme;
}

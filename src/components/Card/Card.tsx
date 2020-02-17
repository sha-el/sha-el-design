import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { Theme, ThemeService } from '../../helpers/theme';

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
            <h3>{title}</h3>
            <h5>{subtitle}</h5>
          </div>
        }
        <div className={style.body} style={body}>
          {children}
        </div>
        {footer && <div className={style.footer}>
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
      margin: '10px 0',
      background: 'white',
      boxSizing: 'border-box',
    },
    header: {
      padding: '16px 24px',
      boxShadow: styleEnum.shadow_bot_2x,
    },
    divider: {
      margin: '0px 0 10px',
    },
    body: {
      padding: '24px 24px 10px',
    },
    footer: {
      padding: '0 24px 10px',
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

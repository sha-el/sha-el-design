import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { Divider } from '../Divider';

export class Card extends React.Component<CardProps, {}> {

  static defaultProps = {
    style: {},
  };

  render() {
    const { title, children, footer, style: { head, body, container } } = this.props;
    const style = this.css();
    return (
      <div className={style.container} style={container}>
        {title && <div className={style.header} style={head}>{title}</div>}
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
    },
    header: {
      padding: '10px',
      fontSize: '20px',
      borderBottom: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
      background: styleEnum.headerBgColor,
    },
    divider: {
      margin: '0px 0 10px',
    },
    body: {
      padding: '10px',
    },
    footer: {
      padding: '10px',
    },
  })
}

interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  style?: {
    container?: React.CSSProperties;
    head?: React.CSSProperties;
    body?: React.CSSProperties;
  };
}
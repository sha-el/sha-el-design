import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';

export class Card extends React.Component<CardProps, {}> {

  static defaultProps = {
    style: {},
  };

  render() {
    const { title, children, style: { head, body, container } } = this.props;
    const style = this.css();
    return (
      <div className={style.container} style={container}>
        {title && <div className={style.header} style={head}>{title}</div>}
        <div style={body}>{children}</div>
      </div>
    );
  }

  css = () => stylesheet({
    container: {
      boxShadow: styleEnum.shadow_bot_2x,
      border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
      padding: '20px',
    },
    header: {
      padding: '10px 0',
      fontSize: '20px',
      borderBottom: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
    },
  })
}

interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: {
    container?: React.CSSProperties;
    head?: React.CSSProperties;
    body?: React.CSSProperties;
  };
}
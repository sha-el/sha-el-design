import * as React from 'react';
import { style } from 'typestyle';

import { getColor } from '../../helpers';
import { MdClear } from 'react-icons/md';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { shadow } from '../../helpers/style';

export const Tag: React.StatelessComponent<TagProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <span
          className={css(props, theme)}
          onClick={() => props.onClick()}
          style={props.style}
        >
          {props.children}
          {props.chips && <span
            className={chipIconCss()}
          >
            <MdClear />
          </span>}
        </span>
      )}
    </ThemeConsumer>
  );
};

const borderStyle = (props: TagProps) => {
  if (!props.outline) {
    return {
      background: props.color,
      color: props.textColor || getColor(props.color),
    };
  }

  return {
    border: '1px solid ' + props.color,
    color: props.textColor || props.color,
  };
};

const chipIconCss = () => style({
  marginLeft: '5px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const css = (props: TagProps, theme: Theme) => style({
  ...borderStyle(props),
  fontSize: '0.8125rem',
  padding: '4px 10px',
  fontWeight: 500,
  margin: '5px',
  display: 'inline-block',
  boxShadow: shadow('DEFAULT', theme),
  cursor: 'pointer',
  textTransform: 'uppercase',
  minWidth: '64px',
  textAlign: 'center',
  lineHeight: 1.75,
  borderRadius: props.chips ? '16px' : '4px',
  letterSpacing: '0.02857em',
  boxSizing: 'border-box',
});

export interface TagProps {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
  textColor?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  chips?: boolean;
}

Tag.defaultProps = {
  onClick: () => null,
  style: {},
};

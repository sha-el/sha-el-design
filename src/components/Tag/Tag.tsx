import * as React from 'react';
import { style } from 'typestyle';

import { getColor } from '../../helpers';
import { MdClear } from 'react-icons/md';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { shadow } from '../../helpers/style';
import { NestedCSSProperties } from 'typestyle/lib/types';

export const Tag: React.StatelessComponent<TagProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <span className={css(props, theme)} onClick={() => props.onClick()} style={props.style}>
          {props.children}
          {props.chips && (
            <span className={chipIconCss()}>
              <MdClear />
            </span>
          )}
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

const sizeCss = (size: TagProps['size']): NestedCSSProperties => {
  if (size === 'DEFAULT') {
    return {
      padding: '0 20px',
      lineHeight: '36px',
      height: '36px',
      fontSize: '0.8125rem',
    };
  }

  return {
    padding: '0 8px',
    lineHeight: '22px',
    height: '22px',
    fontSize: '0.7125rem',
  };
};

const chipIconCss = () =>
  style({
    marginLeft: '5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

const css = (props: TagProps, theme: Theme) =>
  style({
    ...borderStyle(props),
    ...sizeCss(props.size),
    fontWeight: 500,
    margin: '5px',
    display: 'inline-flex',
    boxShadow: shadow('DEFAULT', theme),
    cursor: 'pointer',
    textTransform: 'uppercase',
    minWidth: '64px',
    textAlign: 'center',
    borderRadius: props.chips ? '16px' : '4px',
    letterSpacing: '0.02857em',
    boxSizing: 'border-box',
    alignItems: 'center',
  });

export interface TagProps {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
  textColor?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  chips?: boolean;
  size?: 'DEFAULT' | 'SMALL';
}

Tag.defaultProps = {
  onClick: () => null,
  style: {},
  size: 'DEFAULT',
};

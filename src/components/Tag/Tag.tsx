import * as React from 'react';
import { style } from 'typestyle';

import { getColor } from '../../helpers';
import { styleEnum } from '../../helpers/constants';

export const Tag: React.StatelessComponent<TagProps> = (props) => {
  return (
    <span
      className={css(props)}
      onClick={() => props.onClick(!props.active)}
    >
      {props.children}
    </span>
  );
};

const css = (props: TagProps) => style({
  background: props.active ? props.color : 'transparent',
  color: props.active ? props.textColor || getColor(props.color) : props.color,
  fontSize: '0.8125rem',
  padding: '4px 10px',
  fontWeight: 500,
  margin: '5px',
  display: 'inline-block',
  boxShadow: props.active && styleEnum.shadow_bot,
  cursor: 'pointer',
  textTransform: 'uppercase',
  minWidth: '64px',
  textAlign: 'center',
  lineHeight: 1.75,
  borderRadius: '4px',
  letterSpacing: '0.02857em',
  boxSizing: 'border-box',
});

export interface TagProps {
  color: string;
  children: React.ReactNode;
  onClick?: (closed: boolean) => void;
  active?: boolean;
  textColor?: string;
}

Tag.defaultProps = {
  active: true,
  onClick: () => null,
};

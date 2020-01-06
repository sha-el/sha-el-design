import * as React from 'react';
import { style } from 'typestyle';

import { getColor } from '../../helpers';
import { styleEnum } from '../../helpers/constants';

export const Tag: React.StatelessComponent<TagProps> = (props) => {
  return (
    <span
      className={css(props)}
      onClick={() => props.onClose(!props.active)}
    >
      {props.children}
    </span>
  );
};

const css = (props: TagProps) => style({
  background: props.active ? props.color : 'transparent',
  color: props.active ? props.textColor || getColor(props.color) : props.color,
  borderRadius: '2px',
  fontSize: '12px',
  padding: '5px 10px',
  fontWeight: 700,
  margin: '5px',
  display: 'inline-block',
  boxShadow: props.active && styleEnum.shadow_bot,
  cursor: 'pointer',
  textTransform: 'uppercase',
});

export interface TagProps {
  color: string;
  children: React.ReactNode;
  onClose?: (closed: boolean) => void;
  active?: boolean;
  textColor?: string;
}

Tag.defaultProps = {
  active: true,
  onClose: () => null,
};

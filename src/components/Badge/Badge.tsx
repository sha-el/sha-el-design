import * as React from 'react';
import { style } from './style';

export const Badge: React.FC<BadgeProps> = (props) => {
  const count = props.maxCount && props.maxCount < props.count ? `${props.maxCount}+` : props.count;
  const css = style(props);

  return (
    <div className={css.container}>
      <sup className={css.count}>{count}</sup>
      {props.children}
    </div>
  );
};

Badge.defaultProps = {
  color: 'red',
};

export interface BadgeProps {
  /**
   * Element to show as Children
   */
  children?: React.ReactNode;
  /**
   * Badge's Color
   */
  color?: string;
  /**
   * Number to show
   */
  count?: number;
  /**
   * Max Count to show
   */
  maxCount?: number;
}

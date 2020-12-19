import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { getColor } from '../../helpers';

export const Badge: React.FunctionComponent<BadgeProps> = (props) => {
  const count = props.maxCount && props.maxCount < props.count ? `${props.maxCount}+` : props.count;
  const style = createUseStyles({
    container: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'inline-block',
    },
    count: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '0',
      right: '0',
      transform: 'translate(50%, -50%)',
      background: props.color,
      color: getColor(props.color),
      borderRadius: '10px',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      lineHeight: '20px',
      minWidth: '20px',
      height: '20px',
      fontWeight: 500,
      padding: `0 ${count ? String(count).length * 2 : 0}px`,
      zIndex: 1,
    },
  });

  const css = style();
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

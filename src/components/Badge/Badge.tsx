import * as React from 'react';
import { stylesheet } from 'typestyle';
import { getColor } from '../../helpers';

export const Badge: React.FunctionComponent<BadgeProps> = (props) => {

  const count = props.maxCount && props.maxCount < props.count ? `${props.maxCount}+` : props.count;
  const style = stylesheet({
    container: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'inline-block',
    },
    count: {
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
      textAlign: 'center',
      minWidth: '20px',
      height: '20px',
      fontWeight: 500,
      padding: `0 ${count ? String(count).length * 2 : 0}px`,
      zIndex: 1,
    },
  });

  return (
    <div className={style.container}>
      <sup className={style.count}>{count}</sup>
      {props.children}
    </div>
  );
};

Badge.defaultProps = {
  color: 'red',
};

interface BadgeProps {
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
import * as React from 'react';
import { stylesheet } from 'typestyle';
import { MdCheckCircle } from 'react-icons/md';
import { getColor } from '../../helpers';

export const TimelineItem: React.FunctionComponent<TimelineItemProps> = (props) => {
  const css = style(props);
  return (
    <div className={css.event}>
      <div className={css.tail} />
      <div className={css.content}>
        {props.children}
      </div>
      <div className={css.icon}>
        {props.icon}
      </div>
    </div>
  );
};

TimelineItem.defaultProps = {
  icon: <MdCheckCircle />,
  iconBgColor: '#d2d2d2',
  position: 'left',
};

export const style = (props: TimelineItemProps) => {
  return stylesheet({
    event: {
      position: 'relative',
      padding: '5px 0',
    },
    content: {
      width: 'calc(50% - 50px)',
      position: 'relative',
      left: props.position === 'right' && 'calc(50% + 50px)',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      width: '40px',
      height: '40px',
      background: props.iconBgColor,
      top: 'calc(50% - 20px)',
      right: 'calc(50% - 20px)',
      borderRadius: '50%',
      textAlign: 'center',
      cursor: 'default',
      color: getColor(props.iconBgColor),
      fontSize: '25px',
      padding: '0 7px',
      boxSizing: 'border-box',
    },
    tail: {
      position: 'absolute',
      top: '10px',
      left: '0',
      width: '50%',
      height: '100%',
      borderRight: '2px solid #e8e8e8',
    },
  });
};

export interface TimelineItemProps {
  /**
   * Icon for badge
   * @default <MdCheckCircle />
   */
  icon?: React.ReactNode;
  /**
   * Icon's background
   * @default #d2d2d2
   */
  iconBgColor?: string;

  /**
   * Postion of content
   * Item Content Position
   * @default left
   */
  position?: 'left' | 'right';
}
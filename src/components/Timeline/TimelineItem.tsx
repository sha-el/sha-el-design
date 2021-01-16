import * as React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { timelineItem as style } from './style';

export const TimelineItem: React.FunctionComponent<TimelineItemProps> = (props) => {
  const css = style(props);
  return (
    <div className="event">
      <div className={`content ${props.extra ? 'extra-content' : ''}`}>{props.children}</div>
      <div className="extra">{props.extra}</div>
      <div className="tail" />
      <div className={`icon ${css.icon}`}>{props.icon}</div>
    </div>
  );
};

TimelineItem.defaultProps = {
  icon: <MdCheckCircle />,
  iconBgColor: '#d2d2d2',
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
   * Adds extra element
   * Should be used only with position=altranate
   */
  extra?: React.ReactNode;
}

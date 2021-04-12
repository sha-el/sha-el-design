import * as React from 'react';
import { classes } from '../../helpers';
import { timelineStyle } from './style';

export const Timeline: React.FC<TimelineProps> = (props) => {
  if (Array.isArray(props.children)) {
    return (
      <span className={timelineStyle()}>
        <div className={classes('timeline', `timeline-${props.position}`)}>
          {props.children.map((v, i) => {
            const position = getPosition(i, props.position);
            return React.cloneElement(v as React.ReactElement, { position, key: `timeline-item-${i}` });
          })}
        </div>
      </span>
    );
  }
  return (
    <span className={timelineStyle()}>
      <div className={classes('timeline', `timeline-${props.position}`)}>
        {React.cloneElement(props.children as React.ReactElement, { position: getPosition(0, props.position) })}
      </div>
    </span>
  );
};

const getPosition = (index: number, position: TimelineProps['position']): 'left' | 'right' => {
  if (position === 'alternate') {
    return index % 2 === 0 ? 'left' : 'right';
  }

  return position;
};

Timeline.defaultProps = {
  position: 'left',
};

export interface TimelineProps {
  children: React.ReactNode;
  /**
   * Position of items
   * @default left
   */
  position?: 'right' | 'left' | 'alternate';
}

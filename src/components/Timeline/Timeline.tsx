import * as React from 'react';
import { classes } from '../../helpers';
import { timeline as style, timelineStyle } from './style';

export const Timeline: React.FC<TimelineProps> = (props) => {
  timelineStyle();
  const css = style();
  if (Array.isArray(props.children)) {
    return (
      <div className={classes('timeline', `timeline-${props.position}`)}>
        {props.children.map((v, i) => {
          const position = getPosition(i, props.position);
          return React.cloneElement(v as React.ReactElement, { position, key: `timeline-item-${i}` });
        })}
      </div>
    );
  }
  return (
    <div className={classes('timeline', `timeline-${props.position}`, css.container)}>
      {React.cloneElement(props.children as React.ReactElement, { position: getPosition(0, props.position) })}
    </div>
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

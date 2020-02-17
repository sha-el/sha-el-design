import * as React from 'react';
import { stylesheet } from 'typestyle';

export const Timeline: React.FunctionComponent<TimelineProps> = (props) => {
  const css = style();
  if (Array.isArray(props.children)) {
    return (
      <div>
        {props.children.map((v, i) => React.cloneElement(v as React.ReactElement, { position: getPosition(i, props.position) }))}
      </div>
    );
  }
  return (
    <div className={css.container}>
      {React.cloneElement(props.children as React.ReactElement, { position: getPosition(0, props.position) })}
    </div>
  );
};

const getPosition = (index: number, position: TimelineProps['position']): TimelineProps['position'] => {
  if (position === 'altranate') {
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
  position?: 'right' | 'left' | 'altranate';
}

const style = () => {
  return stylesheet({
    container: {
      width: '70%',
      position: 'relative',
      margin: 'auto',
    },
  });
};
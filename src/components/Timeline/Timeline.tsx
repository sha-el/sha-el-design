import * as React from 'react';
import { stylesheet, cssRule } from 'typestyle';

export const Timeline: React.FunctionComponent<TimelineProps> = (props) => {
  const css = style(props);
  if (Array.isArray(props.children)) {
    return (
      <div className={`timeline timeline-${props.position}`}>
        {props.children.map((v, i) => {
          const position = getPosition(i, props.position);
          return React.cloneElement(v as React.ReactElement, { position });
        })}
      </div>
    );
  }
  return (
    <div className={`timeline timeline-${props.position} ${css.container}`}>
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

cssRule(
  '.timeline', {
    $nest: {
      '& .event': {
        position: 'relative',
      },
      '& .content': {
        position: 'relative',
        margin: '0 60px',
      },
      '& .icon': {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        width: '40px',
        height: '40px',
        top: 'calc(50% - 20px)',
        borderRadius: '50%',
        textAlign: 'center',
        cursor: 'default',
        fontSize: '25px',
        padding: '0 7px',
        boxSizing: 'border-box',
      },
      '& .tail': {
        position: 'absolute',
        top: '10px',
        width: '30px',
        height: '110%',
        borderRight: '2px solid #e8e8e8',
      },
      '& .extra': {
        position: 'absolute',
        top: 'calc(50% - 10px)',
        margin: '0 60px',
      },
    },
  },
);

cssRule(
  '.timeline-left', {
    $nest: {
      '& .icon': {
        left: '10px',
      },
      '& .tail': {
        left: '0',
      },
      '& .extra-content': {
        width: 'calc(50% - 120px)',
        left: 'calc(50% - 30px)',
      },
      '& .extra-content ~ .icon': {
        left: 'calc(50% - 39px)',
      },
      '& .extra-content ~ .tail': {
        left: 'calc(50% - 50px)',
      },
      '& .extra': {
        textAlign: 'right',
        width: 'calc(50% - 120px)',
      },
    },
  },
);

cssRule(
  '.timeline-right', {
    $nest: {
      '& .icon': {
        right: '10px',
      },
      '& .tail': {
        right: '30px',
      },
      '& .content': {
        textAlign: 'right',
      },
      '& .extra-content': {
        width: 'calc(50% - 120px)',
      },
      '& .extra-content ~ .icon': {
        left: 'calc(50% - 39px)',
      },
      '& .extra-content ~ .tail': {
        left: 'calc(50% - 50px)',
      },
      '& .extra': {
        textAlign: 'left',
        width: 'calc(50% - 120px)',
        left: 'calc(50% - 30px)',
      },
    },
  },
);

cssRule(
  '.timeline-alternate', {
    $nest: {
      '& .tail': {
        left: 'calc(50% - 50px)',
      },
      '& .icon': {
        left: 'calc(50% - 39px)',
      },
      '& .event:nth-child(odd)': {
        $nest: {
          '& .content': {
            textAlign: 'right',
            width: 'calc(50% - 120px)',
          },
          '& .extra': {
            textAlign: 'left',
            width: 'calc(50% - 120px)',
            left: 'calc(50% - 30px)',
          },
        },
      },
      '& .event:nth-child(even)': {
        $nest: {
          '& .content': {
            width: 'calc(50% - 120px)',
            left: 'calc(50% - 30px)',
          },
          '& .extra': {
            textAlign: 'right',
            width: 'calc(50% - 120px)',
          },
        },
      },
    },
  },
);

const style = (props: TimelineProps) => {
  return stylesheet({
    container: {
      width: '70%',
      position: 'relative',
      margin: 'auto',
    },
  });
};
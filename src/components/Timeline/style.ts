import { createUseStyles, jss } from 'react-jss';
import { getColor } from '../../helpers';

export const timeline = createUseStyles(
  {
    container: {
      width: '70%',
      position: 'relative',
      margin: 'auto',
    },
  },
  { name: 'sha-el-timeline' },
);

export const timelineItem = createUseStyles(
  {
    icon: (props) => ({
      background: props.iconBgColor,
      color: getColor(props.iconBgColor),
    }),
  },
  { name: 'sha-el-timeline-list' },
);

export const timelineStyle = () => {
  const style = {
    '@global': {
      '.timeline': {
        '& .event': {
          position: 'relative',
          margin: '10px 0',
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
      '.timeline-left': {
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
      '.timeline-right': {
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
      '.timeline-alternate': {
        '& .tail': {
          left: 'calc(50% - 50px)',
        },
        '& .icon': {
          left: 'calc(50% - 39px)',
        },
        '& .event:nth-child(odd)': {
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
        '& .event:nth-child(even)': {
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
  };

  jss.createStyleSheet(style).attach();
};

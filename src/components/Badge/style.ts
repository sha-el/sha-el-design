import { createUseStyles } from 'react-jss';
import { getColor } from '../../helpers';

export const style = createUseStyles(
  {
    container: () => {
      return {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'inline-block',
      };
    },
    count: (props) => {
      const count = props.maxCount && props.maxCount < props.count ? `${props.maxCount}+` : props.count;

      return {
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
      };
    },
  },
  { name: 'sha-el-badge' },
);

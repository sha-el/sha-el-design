import { createUseStyles } from 'react-jss';
import { getColor } from '../../helpers';
import { shadow } from '../../helpers/style';
import { TagProps } from './Tag';

const borderStyle = (props: TagProps) => {
  if (!props.outline) {
    return {
      background: props.color,
      color: props.textColor || getColor(props.color),
    };
  }

  return {
    border: '1px solid ' + props.color,
    color: props.textColor || props.color,
  };
};

const sizeCss = (size: TagProps['size']) => {
  if (size === 'DEFAULT') {
    return {
      padding: '0 20px',
      minWidth: '64px',
      lineHeight: '36px',
      height: '36px',
      fontSize: '0.8125rem',
    };
  }

  return {
    padding: '0 14px',
    minWidth: '50px',
    lineHeight: '22px',
    height: '22px',
    fontSize: '0.7125rem',
  };
};

export const chipIconCss = createUseStyles(
  {
    chipIcon: {
      marginLeft: '5px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  { name: 'sha-el-chip-tag' },
);

export const style = createUseStyles(
  {
    tag: ({ props, theme }) => {
      return {
        ...borderStyle(props),
        ...sizeCss(props.size),
        fontWeight: 500,
        margin: '5px',
        display: 'inline-flex',
        boxShadow: shadow('DEFAULT', theme),
        cursor: props.onClick && 'pointer',
        textTransform: 'uppercase',
        textAlign: 'center',
        borderRadius: props.chips ? '16px' : '4px',
        letterSpacing: '0.02857em',
        boxSizing: 'border-box',
        alignItems: 'center',
      };
    },
  },
  { name: 'sha-el-tag' },
);

import { css } from '@emotion/css';
import { zAboveBase } from '../../helpers/zIndex';
import { Theme } from '../Theme/Theme';
import { SidebarProps } from './Sidebar';

export const style = (props: SidebarProps, theme: Theme, fixed: boolean) => {
  return {
    container: css({
      padding: '10px',
      height: `calc(100vh - ${props.top + props.top ? 20 : 0}px)`,
      background: theme.background,
      position: 'fixed',
      left: 0,
      top: props.top,
      width: fixed ? props.expandWidth + 'px' : props.collapsedWidth + 'px',
      transition: '.4s ease',
      overflowX: 'hidden',
      overflowY: 'hidden',
      zIndex: zAboveBase,
      '&:hover': {
        overflowY: 'auto',
        width: props.expandWidth + 'px',
        '& .sidebar-bottom': {
          width: props.expandWidth + 'px',
        },
      },
    }),
    sidebar: css({
      '& .list-item': {
        borderRadius: '6.5px',
        cursor: 'pointer',
      },
    }),
    logo: css({
      width: props.expandWidth + 'px',
    }),
    bottom: css({
      position: 'fixed',
      bottom: '0',
      left: '10px',
      zIndex: zAboveBase,
      width: fixed ? props.expandWidth + 'px' : props.collapsedWidth + 'px',
      transition: '.4s ease',
    }),
  };
};

import { css } from '@emotion/css';
import { zAboveBase } from '../../helpers/zIndex';
import { Theme } from '../Theme/Theme';
import { SidebarProps } from './Sidebar';

export const style = (props: SidebarProps, theme: Theme, fixed: boolean) => {
  return {
    container: css({
      padding: '10px',
      height: '100vh',
      background: theme.background,
      position: 'fixed',
      left: 0,
      top: 0,
      width: fixed ? props.expandWidth + 'px' : props.collapsedWidth + 'px',
      transition: '.4s ease',
      overflowX: 'hidden',
      overflowY: 'auto',
      zIndex: zAboveBase,
      '&:hover': {
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

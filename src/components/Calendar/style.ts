import { css } from '@emotion/css';

export const style = {
  dateContent: css({
    position: 'static',
    width: '110%',
    height: '0',
    textAlign: 'left',
    paddingBottom: '25%',
    boxSizing: 'border-box',
  }),
  cell: css({
    border: '1px solid rgba(0,0,0,0.1)',
    color: '#555',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0',
    cursor: 'pointer',
  }),
  badge: css({
    height: '10px',
    minWidth: '100%',
    cursor: 'pointer',
    margin: '2px 0',
  }),
};

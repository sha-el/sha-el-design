import { createUseStyles } from 'react-jss';

export const style = createUseStyles({
  dateContent: {
    position: 'static',
    width: '110%',
    height: '0',
    textAlign: 'left',
    paddingBottom: '25%',
    boxSizing: 'border-box',
  },
  cell: {
    border: '1px solid rgba(0,0,0,0.1)',
    color: '#555',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0',
    cursor: 'pointer',
  },
  badge: {
    height: '10px',
    minWidth: '100%',
    cursor: 'pointer',
    margin: '2px 0',
  },
});

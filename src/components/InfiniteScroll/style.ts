import { createUseStyles } from 'react-jss';

export const style = createUseStyles({
  container: ({ height }) => ({
    height: height || 'auto',
    overflow: height ? 'auto' : 'hidden',
    position: 'relative',
  }),
  loadingIndicator: {
    marginBottom: '20px',
    position: 'relative',
    margin: 'auto',
    left: 0,
    right: 0,
  },
  loadingContainer: {
    position: 'relative',
  },
});

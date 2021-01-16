import elevations from '../../helpers/elevations';
import { createUseStyles } from 'react-jss';
import { Theme, theming } from '../Theme/Theme';

export const cardStyle = createUseStyles(
  (theme: Theme) => ({
    container: {
      background: theme.background,
      boxSizing: 'border-box',
      padding: '16px',
    },
    ...elevations(theme),
  }),
  { theming, name: 'sha-el-card' },
);

export const cardHeaderStyle = createUseStyles({
  header: {
    marginBottom: '10px',
  },
});

export const cardMediaStyle = createUseStyles({
  image: ({ props }) => ({
    margin: '-16px',
    marginBottom: '12px',
    backgroundImage: `url("${props.image}")`,
    height: props.height || 'auto',
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }),
});

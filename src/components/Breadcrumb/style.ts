import { createUseStyles } from 'react-jss';
import { colorShades } from '../../helpers/color';

export const style = createUseStyles({
  breadcrumbs: (theme) => {
    const [, , primary3] = colorShades(theme.primary);
    return {
      color: theme.textColor,
      '& li': {
        display: 'inline-flex',
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1px',
        '& *': {
          color: theme.textColor,
        },
        '&:last-child': {
          '& *': {
            color: primary3,
          },
        },
      },
    };
  },
});

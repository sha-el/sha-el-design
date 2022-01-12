import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { classes } from '../../helpers';
import { cardStyle } from './style';
import { elevationCss } from '../../helpers/elevations';
import { borderCss } from '../../helpers/border';
import { marginCss } from '../../helpers/margin';
import { paddingCss } from '../../helpers/padding';
import { SurfaceProps } from '../../typings/surface';

export const Card: React.FC<CardProps> = (props) => {
  const {
    className,
    elevation = 4,
    border,
    margin = { xs: 2, sm: 5 },
    padding = { xs: 5, sm: 10, md: 15 },
    ...rest
  } = props;

  const theme = useTheme();
  const css = cardStyle(theme);

  return (
    <div
      className={classes(
        className,
        css,
        elevationCss(elevation),
        borderCss(border),
        marginCss(margin),
        paddingCss(padding),
        'sha-el-card',
      )}
      {...rest}
    >
      {props.children}
    </div>
  );
};

export interface CardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    SurfaceProps {
  children?: React.ReactNode;
}

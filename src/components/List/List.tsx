import * as React from 'react';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { useTheme } from '../Theme/Theme';
import { list as style } from './style';

export interface ListProps {
  children?: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
  elevation?: number;
  className?: string;
  densed?: boolean;
  backgroundColor?: string;
}

export const List: React.FC<ListProps> = (props) => {
  const { elevation = 2 } = props;
  const theme = useTheme();
  const css = style(props.densed, props.backgroundColor || theme.background);

  return (
    <div>
      <ul className={classes(elevationCss(elevation), props.className, css)} style={props.style}>
        {Array.isArray(props.children)
          ? (props.children as React.ReactElement[])?.map(
              (v, i) =>
                v &&
                React.cloneElement(v, {
                  key: `item-${i}`,
                  gutter: (props.densed && [0, '6px 8px 6px 9px']) || v.props.gutter,
                }),
            )
          : React.cloneElement(props.children || <div />, {
              gutter: (props.densed && [0, '6px 8px 6px 9px']) || props.children?.props.gutter,
            })}
      </ul>
    </div>
  );
};

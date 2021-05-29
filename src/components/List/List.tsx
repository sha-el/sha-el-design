import * as React from 'react';
import { classes } from '../../helpers';
import { borderCss } from '../../helpers/border';
import { elevationCss } from '../../helpers/elevations';
import { marginCss } from '../../helpers/margin';
import { paddingCss } from '../../helpers/padding';
import { SurfaceProps } from '../../typings/surface';
import { useTheme } from '../Theme/Theme';
import { CollapsibleContext } from './CollapsibleList';
import { list as style } from './style';

export interface ListProps extends SurfaceProps {
  children?: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
  className?: string;
  densed?: boolean;
  backgroundColor?: string;
}

export const List: React.FC<ListProps> = (props) => {
  const { elevation = 2, margin = 0, padding = props.densed ? [4, 0] : [8, 0] } = props;
  const theme = useTheme();
  const css = style(props.backgroundColor || theme.background, props.border, theme);

  return (
    <div>
      <CollapsibleContext.Consumer>
        {({ isCollapsible }) => (
          <ul
            className={classes(
              elevationCss(elevation),
              borderCss(props.border),
              marginCss(margin),
              paddingCss(padding),
              props.className,
              css,
            )}
            style={props.style}
          >
            {Array.isArray(props.children)
              ? (props.children as React.ReactElement[])?.map(
                  (v, i) =>
                    v &&
                    React.cloneElement(v, {
                      key: `item-${i}`,
                      padding:
                        (props.densed
                          ? isCollapsible
                            ? [6, 8, 6, 28]
                            : [6, 8, 6, 9]
                          : isCollapsible && [12, 16, 12, 38]) || v.props.padding,
                    }),
                )
              : React.cloneElement(props.children || <div />, {
                  padding:
                    (props.densed
                      ? isCollapsible
                        ? [6, 8, 6, 28]
                        : [6, 8, 6, 9]
                      : isCollapsible && [12, 16, 12, 38]) || props.children?.props.padding,
                })}
          </ul>
        )}
      </CollapsibleContext.Consumer>
    </div>
  );
};

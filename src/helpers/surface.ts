import { borderCss } from '../helpers/border';
import { filledCss } from '../helpers/color';
import { elevationCss } from '../helpers/elevations';
import { marginCss } from '../helpers/margin';
import { paddingCss } from '../helpers/padding';
import { SurfaceProps } from '../typings/surface';

export const addSurfaceCss = (props: SurfaceProps) => {
  return [
    elevationCss(props.elevation),
    borderCss(props.border),
    paddingCss(props.padding),
    marginCss(props.margin),
    filledCss(props.filled),
  ];
};

export const surfaceProps = (props: SurfaceProps) => {
  return {
    elevation: props.elevation,
    border: props.border,
    padding: props.padding,
    margin: props.margin,
    filled: props.filled,
  };
};

import * as React from 'react';
import { classes } from '../../helpers';
import { useTheme } from '../Theme/Theme';
import { style } from './style';
import { Tooltip, TooltipProps } from '../Tooltip/Tooltip';

export const Popover: React.FC<PopoverProps> = (props) => {
  const theme = useTheme();
  const [childWidth, updateChildWidth] = React.useState<number>();
  const css = style(theme, props.expand, childWidth);

  const { className } = props;

  return (
    <Tooltip
      {...props}
      className={classes(className, css)}
      referenceElement={(e) => updateChildWidth(e?.getBoundingClientRect().width)}
    />
  );
};

export interface PopoverProps extends TooltipProps {
  /**
   * Takes width of child
   */
  expand?: boolean;
}

Popover.defaultProps = {
  style: {},
};

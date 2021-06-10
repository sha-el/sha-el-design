import * as React from 'react';
import { classes, isBrowser } from '../../helpers';
import { useTheme } from '../Theme/Theme';
import { style } from './style';
import { Tooltip, TooltipProps } from '../Tooltip/Tooltip';

export const Popover: React.FC<PopoverProps> = (props) => {
  const theme = useTheme();
  const [childWidth, updateChildWidth] = React.useState<number>();
  const css = style(theme, props.expand || false, childWidth);

  const { children, className } = props;

  if (!isBrowser) {
    return React.cloneElement(children);
  }

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

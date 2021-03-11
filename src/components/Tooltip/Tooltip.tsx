import React from 'react';
import RCTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const theme = useTheme();
  const css = style(theme);

  return <RCTooltip {...props} overlayClassName={css} />;
};

export { TooltipProps };

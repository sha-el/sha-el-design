import React from 'react';
import RCTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { stylesheet } from 'typestyle';
import { color } from 'csx';
import { colorShades } from '../../helpers/color';

const style = (theme: Theme) =>
  stylesheet({
    overlay: {
      background: colorShades(color(theme.background).invert().toString())[4],
      color: theme.background,
      borderRadius: '4px',
      padding: '5px 10px',
    },
  });

export const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);

        return <RCTooltip {...props} overlayClassName={css.overlay} />;
      }}
    </ThemeConsumer>
  );
};

export { TooltipProps };

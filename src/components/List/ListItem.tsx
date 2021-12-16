import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { listItem as listStyle } from './style';
import { lightText } from '../../helpers/color';
import { Text } from '../Text';
import { classes } from '../../helpers';
import { getColor } from '../../helpers/color';
import { MarginClassNameInput, marginCss } from '../../helpers/margin';
import { PaddingClassNameInput, paddingCss } from '../../helpers/padding';
import { Theme } from '../Theme/Theme';

export interface ListItemProps extends Omit<React.HtmlHTMLAttributes<HTMLLIElement>, 'onChange'> {
  subtitle?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  selected?: boolean;
  element?: React.ReactElement;
  className?: string;
  margin?: MarginClassNameInput;
  padding?: PaddingClassNameInput;
}

type ElementProps = Partial<ListItemProps> & {
  theme: Theme;
} & React.HTMLProps<HTMLLIElement>;

const Element = React.forwardRef<unknown, ElementProps>(
  ({ element, className, onClick, selected, theme, style, ...p }, ref) =>
    React.cloneElement(element || <li />, {
      ref,
      className: classes(className, paddingCss(0), 'list-item'),
      onClick: onClick,
      style: {
        background: selected && theme.primary,
        color: selected && getColor(theme.primary),
        wrap: 'nowrap',
        alignItems: 'center',
        display: 'flex',
        ...style,
      },
      ...p,
    }),
);

export const ListItem = React.forwardRef<unknown, ListItemProps>((props, ref) => {
  const {
    style = {},
    onClick,
    avatar,
    children,
    subtitle,
    action,
    selected,
    element,
    className,
    padding = [12, 16, 12, 18],
    margin = 0,
    ...rest
  } = props;

  const theme = useTheme();
  const css = listStyle(theme.background, !!onClick);

  return (
    <Element
      theme={theme}
      ref={ref}
      style={style}
      selected={selected}
      element={element}
      className={classes(className, css)}
      onClick={onClick}
      {...rest}
    >
      {avatar && (
        <div className={classes(marginCss(margin), paddingCss(padding))} style={{ flex: '0 1 auto' }}>
          {avatar}
        </div>
      )}
      {children && (
        <div className={classes(marginCss(margin), paddingCss(padding))} style={{ flex: '1 0 auto' }}>
          <div>{children}</div>
          <Text fontSize="12px" color={lightText(theme)}>
            {subtitle}
          </Text>
        </div>
      )}
      {action && (
        <div className={classes(marginCss(margin), paddingCss(padding))} style={{ flex: '0 1 auto' }}>
          {action}
        </div>
      )}
    </Element>
  );
});

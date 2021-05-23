import * as React from 'react';
import { Row, Col } from '../Grid';
import { useTheme } from '../Theme/Theme';
import { listItem as listStyle } from './style';
import { lightText } from '../../helpers/color';
import { Text } from '../Text';
import { RowProps } from '../Grid/Row';
import { classes } from '../../helpers';
import { getColor } from '../../helpers/color';

export interface ListItemProps extends Omit<React.HtmlHTMLAttributes<HTMLLIElement>, 'onChange'> {
  subtitle?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  selected?: boolean;
  element?: React.ReactElement;
  className?: string;
  gutter?: RowProps['gutter'];
}

export const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    style = {},
    onClick,
    avatar,
    children,
    subtitle,
    action,
    selected,
    gutter = [32, 24],
    element,
    className,
    ...rest
  } = props;

  const theme = useTheme();
  const css = listStyle(theme.background);

  const Element: React.FC<unknown> = (p) =>
    React.cloneElement(element || <li />, {
      className: classes(className, css, 'list-item'),
      onClick: onClick,
      style: {
        background: selected && theme.primary,
        color: selected && getColor(theme.primary),
        ...style,
      },
      ...p,
    });

  return (
    <Element {...rest}>
      <Row wrap="nowrap" gutter={gutter} alignItems="center">
        {avatar && <Col flex="0 1 auto">{avatar}</Col>}
        {children && (
          <Col flex="1 0 auto">
            <div>{children}</div>
            <Text fontSize="12px" color={lightText(theme)}>
              {subtitle}
            </Text>
          </Col>
        )}
        {action && <Col flex="0 1 auto">{action}</Col>}
      </Row>
    </Element>
  );
};

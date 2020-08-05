import * as React from 'react';
import { Row, Col } from '../Grid';
import { RowProps } from '../Grid/Row';
import { ThemeConsumer } from '../Theme/Theme';
import { style as listStyle } from './style';
import { colorShades, lightText } from '../../helpers/color';
import { Text } from '../Text';

export interface ListItemProps {
  subtitle?: React.ReactNode;
  justifyContent?: RowProps['justifyContent'];
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  selected?: boolean;
}

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { justifyContent, style = {}, onClick, avatar, children, subtitle, action, selected } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = listStyle(theme);
        return (
          <li
            className={css.listItem}
            onClick={onClick}
            style={{
              background: selected && colorShades(theme.primary)[4],
              ...style,
            }}
          >
            <Row
              gutter={[0, '12px 16px 12px 18px']}
              alignItems='center'
              justifyContent={justifyContent}
            >
              {
                avatar && (
                  <Col flex='0 1 auto'>
                    {avatar}
                  </Col>
                )
              }
              <Col flex='1 0 auto'>
                <div>
                  {children}
                </div>
                <Text color={lightText(theme)}>
                  {subtitle}
                </Text>
              </Col>
              <Col flex='0 1 auto'>
                {action}
              </Col>
            </Row>
          </li>
        );
      }}
    </ThemeConsumer>
  );
};

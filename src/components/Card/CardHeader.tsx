import * as React from 'react';
import { Row, Col } from '../../';
import { lightText } from '../../helpers/color';
import { useTheme } from '../Theme/Theme';
import { Text } from '../Text';
import { classes } from '../../helpers';
import { cardHeaderStyle } from './style';

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { children, subtitle, className, action, ...restProps } = props;

  const theme = useTheme();
  const css = cardHeaderStyle;

  return (
    <div className={classes(css, className)} {...restProps}>
      <Row gutter={[0, 0]} alignItems="center">
        <Col flex="1 0 auto">
          <Text variant="h5" margin="0">
            {children}
          </Text>
          <Text color={lightText(theme)}>{subtitle}</Text>
        </Col>
        <Col flex="0 1 auto">{action}</Col>
      </Row>
    </div>
  );
};

export interface CardHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

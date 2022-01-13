import * as React from 'react';
import { Row, Col } from '../../';
import { lightText } from '../../helpers/color';
import { useTheme } from '../Theme/Theme';
import { Text } from '../Text';
import { classes } from '../../helpers';
import { marginCss } from '../../helpers/margin';

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { children, subtitle, className, action, ...restProps } = props;

  const theme = useTheme();

  return (
    <div className={classes(marginCss([0, 0, 20, 0]), className)} {...restProps}>
      <Row alignItems="center">
        <Col flex="1">
          <Text lineHeight="2rem" color="textColor" variant="h6" margin="0">
            {children}
          </Text>
          <Text lineHeight="1.25rem" className="subtitle" color={lightText(theme)}>
            {subtitle}
          </Text>
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

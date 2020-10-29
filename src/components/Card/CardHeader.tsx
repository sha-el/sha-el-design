import * as React from 'react';
import { classes, style } from 'typestyle';
import { Row, Col } from '../../';
import { lightText } from '../../helpers/color';
import { ThemeConsumer } from '../Theme/Theme';
import { Text } from '../Text';
import { TextProps } from '../Text/Text';

export const CardHeader: React.FunctionComponent<CardHeaderProps> = (props) => {
  const { children, subtitle, className, action, headerTextProps, subtitleTextProps, ...restProps } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style({
          marginBottom: '10px',
        });
        return (
          <div className={classes(css, className)} {...restProps}>
            <Row gutter={[0, 0]} alignItems="center">
              <Col style={{ paddingLeft: '0' }} flex="1 0 auto">
                <Text margin="0" variant="h5" {...headerTextProps}>
                  {children}
                </Text>
                <Text color={lightText(theme)} {...subtitleTextProps}>
                  {subtitle}
                </Text>
              </Col>
              <Col flex="0 1 auto">{action}</Col>
            </Row>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

export interface CardHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  headerTextProps?: TextProps;
  subtitleTextProps?: TextProps;
}

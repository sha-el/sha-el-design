import * as React from 'react';
import { classes, style } from 'typestyle';
import { Row, Col } from '../../';
import { lightText } from '../../helpers/color';
import { ThemeConsumer } from '../Theme/Theme';

export const CardHeader: React.FunctionComponent<CardHeaderProps> = (props) => {
  const { children, subtitle, className, action, ...restProps } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style({
          marginBottom: '12px',
          $nest: {
            '.subtitle': {
              color: lightText(theme),
            },
          },
        });
        return (
          <div className={classes(css, className)} {...restProps}>
            <Row>
              <Col style={{ paddingLeft: '0' }} flex='1 0 auto'>
                <h5>{children}</h5>
                <div className='subtitle'>{subtitle}</div>
              </Col>
              <Col flex='0 1 auto'>
                {action}
              </Col>
            </Row>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

interface CardHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}
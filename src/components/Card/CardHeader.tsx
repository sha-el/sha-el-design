import * as React from 'react';
import { classes, style } from 'typestyle';
import { Row, Col, Button } from '../../';
import { IoMdOptions } from 'react-icons/io';

export const CardHeader: React.FunctionComponent<CardHeaderProps> = (props) => {
  const { children, subtitle, className, action, ...restProps } = props;
  const css = style({
    marginBottom: '12px',
  });

  return (
    <div className={classes(css, className)} {...restProps}>
      <Row>
        <Col style={{ paddingLeft: '0' }} flex='1 0 auto'>
          <h5>{children}</h5>
          <div className='subtitle secondary-text-color'>{subtitle}</div>
        </Col>
        <Col flex='0 1 auto'>
          {action}
        </Col>
      </Row>
    </div>
  );
};

interface CardHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}
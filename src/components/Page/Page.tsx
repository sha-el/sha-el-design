import * as React from 'react';
import { BreadcrumbProps, Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Row, Tag, Col } from '../../';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';

export const Page: React.StatelessComponent<Props> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <Row>
          <Col span={24}>
            <Breadcrumb {...props.breadcrumbs} />
          </Col>
          {
            props.backIcon &&
            <Col span={1}>
              <div className={css.backIcon}>
                {props.backIcon}
              </div>
            </Col>
          }
          <Col span={11}>
            <h3>{props.title}</h3>
            <h5>{props.subtitle}</h5>
          </Col>
        </Row>
        {props.extra}
      </div>
      <div className={css.body}>
        {props.children}
      </div>
    </div>
  );
};

const css = stylesheet({
  container: {
  },
  header: {
    padding: '10px',
    background: 'white',
    boxShadow: styleEnum.shadow_bot,
  },
  body: {
    padding: '10px',
    margin: '10px',
  },
  backIcon: {
    borderRight: '1px solid #ccc',
    color: '#555',
  },
});

interface Props {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbProps;
  backIcon?: React.ReactNode;
  extra?: React.ReactNode;
  tags?: Tag[];

  onBack?: () => void;
}
import * as React from 'react';
import { BreadcrumbProps, Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Row, Col } from '../../';
import { TabsProps } from '../Tabs/Tabs';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { TagProps } from 'components/Tag/Tag';

export const Page: React.StatelessComponent<Props> = (props) => {
  return (
    <>
      <div className={css.header}>
        <Row alignItems='flex-start'>
          <Col>
            <Breadcrumb {...props.breadcrumbs} />
          </Col>
          <Col span={12}>
            <Row>
              <Col span={2}>
                <div className={css.backIcon}>
                  {props.backIcon}
                </div>
              </Col>
              <Col span={22}>
                <div className={css.inline}><h4>{props.title}</h4></div>
                <div className={css.inline}>{props.tags}</div>
              </Col>
              <Col offset={2} span={24}>
                <h5>{props.subtitle}</h5>
              </Col>
            </Row>
          </Col>
          <Col span={12} alignSelf='flex-end'>
            {props.extra}
          </Col>
          <Col>
            {props.bottom}
          </Col>
        </Row>
      </div>
      <div>
        {props.tabs}
        {props.children}
      </div>
    </>
  );
};

const css = stylesheet({
  container: {
  },
  header: {
    padding: '0 10px',
    background: styleEnum.headerBgColor,
    boxShadow: styleEnum.shadow_bot_2x,
  },
  inline: {
    display: 'inline-block',
    marginRight: '.5em',
  },
  backIcon: {
    boxShadow: styleEnum.shadow,
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    fontSize: '22px',
    boxSizing: 'border-box',
    padding: '10px',
    cursor: 'pointer',
  },
});

interface Props {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbProps;
  backIcon?: React.ReactNode;
  extra?: React.ReactNode;
  bottom?: React.ReactNode;
  tags?: React.ReactElement<TagProps>[];
  tabs?: React.ReactElement<TabsProps>;
}
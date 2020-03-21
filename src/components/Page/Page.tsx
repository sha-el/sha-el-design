import * as React from 'react';
import { Row, Col } from '../../';
import { stylesheet, classes } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { TagProps } from '../Tag/Tag';
import { TabPanelProps } from '../Tabs/TabPanel';
import { TabHeader, TabPanelContainer } from '../Tabs';
import { nestedAccess } from '../../helpers';

export const Page: React.StatelessComponent<PageProps> = (props) => {

  const [activeKey, setActiveKey] = React.useState(nestedAccess(props.tabs, 'defaultActiveKey'));

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Row alignItems='center'>
          {props.backIcon && <Col flex='0 1 auto'>{props.backIcon}</Col>}
          <Col flex='0 1 auto'>
            {props.title}
          </Col>
          <Col flex='1 0 auto'>
            {props.tags}
          </Col>
          <Col flex='0 1 auto'>
            {props.extra}
          </Col>
        </Row>
      </div>
      {(props.bottom || props.tabs) && (<div style={{ paddingRight: '0', paddingLeft: '0' }} className={classes(css.header, css.bottom)}>
        <Row style={{ paddingBottom: '0', paddingTop: '0' }} alignItems='flex-end'>
          {props.tabs && <Col flex='0 1 auto'>
            <TabHeader
              titles={props.tabs.headers}
              activeKey={activeKey}
              onClick={setActiveKey}
            />
          </Col>}
          <Col flex='1 0 auto'>{props.bottom}</Col>
        </Row>
      </div>)}
      {props.tabs && <TabPanelContainer
        titles={props.tabs.headers}
        activeKey={activeKey}
        destroyOnChange={nestedAccess(props.tabs, 'destroyOnChange')}
      >
        {props.tabs.panels}
      </TabPanelContainer>
      }
      <div>
        {props.children}
      </div>
    </ div>
  );
};

const css = stylesheet({
  container: {
    margin: '20px',
  },
  header: {
    padding: '0px 15px',
    background: 'white',
    boxShadow: styleEnum.shadow_2x,
    borderRadius: '4px',
    marginBottom: '10px',
  },
  bottom: {
    marginTop: '24px',
    minHeight: '50px',
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

export interface PageProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  backIcon?: React.ReactNode;
  extra?: React.ReactNode;
  bottom?: React.ReactNode;
  tags?: React.ReactElement<TagProps>[];
  tabs?: {
    headers: TabPanelProps[];
    panels: React.ReactElement<TabPanelProps> | React.ReactElement<TabPanelProps>[];
    defaultActiveKey: string;
    destroyOnChange?: boolean;
  };
}
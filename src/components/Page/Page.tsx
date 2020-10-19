import * as React from 'react';
import { Row, Col } from '../../';
import { stylesheet, classes } from 'typestyle';
import { TagProps } from '../Tag/Tag';
import { TabPanelProps } from '../Tabs/TabPanel';
import { TabHeader, TabPanelContainer } from '../Tabs';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { nestedAccess } from '../../helpers';
import { lightText } from '../../helpers/color';
import { shadow } from '../../helpers/style';

export const Page: React.FC<PageProps> = (props) => {
  const [activeKey, setActiveKey] = React.useState(nestedAccess(props.tabs, 'defaultActiveKey'));

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);
        return (
          <div className={css.container}>
            <div className={css.header}>
              <Row alignItems="center" gutter={['5px 0', '0 .5rem']}>
                {props.backIcon && (
                  <Col style={{ lineHeight: '0' }} flex="0 1 auto">
                    {props.backIcon}
                  </Col>
                )}
                <Col flex="0 1 auto">{props.title}</Col>
                <Col flex="1 0 auto">{props.tags}</Col>
                <Col flex="0 1 auto">{props.extra}</Col>
              </Row>
              {(props.bottom || props.tabs) && (
                <div style={{ paddingRight: '0', paddingLeft: '0' }} className={classes(css.bottom)}>
                  <Row gutter={[0, 0]} alignItems="flex-end">
                    {props.tabs && (
                      <Col flex="0 1 auto">
                        <TabHeader titles={props.tabs.headers} activeKey={activeKey} onClick={setActiveKey} />
                      </Col>
                    )}
                    <Col flex="1 0 auto">{props.bottom}</Col>
                  </Row>
                </div>
              )}
            </div>
            {props.tabs && (
              <TabPanelContainer
                titles={props.tabs.headers}
                activeKey={activeKey}
                unMountOnChange={nestedAccess(props.tabs, 'unMountOnChange')}
              >
                {props.tabs.panels}
              </TabPanelContainer>
            )}
            <div>{props.children}</div>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (theme: Theme) => {
  const shadow2x = shadow('2X', theme);
  const shadowDef = shadow('DEFAULT', theme);

  return stylesheet({
    container: {
      margin: '1%',
    },
    header: {
      padding: '0px 1.5%',
      background: theme.background,
      color: theme.textColor,
      boxShadow: shadow2x,
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
      boxShadow: shadowDef,
      width: '40px',
      height: '40px',
      borderRadius: '100%',
      color: lightText(theme),
      display: 'flex',
      alignItems: 'center',
      fontSize: '22px',
      boxSizing: 'border-box',
      padding: '10px',
      cursor: 'pointer',
    },
  });
};

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
    unMountOnChange?: boolean;
  };
}

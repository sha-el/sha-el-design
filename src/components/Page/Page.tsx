import * as React from 'react';
import { Row, Col } from '../../';
import { TagProps } from '../Tag/Tag';
import { TabPanelProps } from '../Tabs/TabPanel';
import { TabHeader, TabPanelContainer } from '../Tabs';
import { useTheme } from '../Theme/Theme';
import { classes } from '../../helpers';
import { style } from './style';
import { paddingCss } from '../../helpers/padding';

export const Page: React.FC<PageProps> = (props) => {
  const theme = useTheme();
  const css = style(theme);
  return (
    <div>
      <div style={{ paddingBottom: '0' }} className={classes(css.header, paddingCss({ xs: 5, sm: 10, md: 15 }))}>
        <Row alignItems="center" gutter={[14, 10]}>
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
            <Row alignItems="center" justifyContent="space-between">
              {props.tabs && (
                <Col flex="1 0 auto">
                  <TabHeader
                    titles={props.tabs.headers}
                    activeKey={props.tabs?.activeKey}
                    onClick={(e) => {
                      props?.tabs?.onChange?.(e);
                    }}
                  />
                </Col>
              )}
              <Col flex="0 1 auto">{props.bottom}</Col>
            </Row>
          </div>
        )}
      </div>
      {props.tabs && (
        <TabPanelContainer
          titles={props.tabs.headers}
          activeKey={props.tabs.activeKey}
          unMountOnChange={props.tabs?.unMountOnChange}
        >
          {props.tabs.panels}
        </TabPanelContainer>
      )}
      <div>{props.children}</div>
    </div>
  );
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
    unMountOnChange?: boolean;
    activeKey?: string;
    onChange?: (e: string) => void;
  };
}

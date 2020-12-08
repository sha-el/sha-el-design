import * as React from 'react';
import { classes, stylesheet } from 'typestyle';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { getColor } from '../../helpers';
import elevations from '../../helpers/elevations';
import { Col, Row } from '../Grid';
import { Menu } from '../Menu';
import { Button } from '../Button';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { SidePanelContext } from './Container';
import { TabPanelContainer } from '../Tabs';

export const SidePanel: React.FunctionComponent<SidePanelProps> = (props) => {
  const children: React.ReactElement[] = Array.isArray(props.children)
    ? (props.children as React.ReactElement[])
    : [props.children];

  const bottom: React.ReactElement[] = Array.isArray(props.bottom)
    ? (props.bottom as React.ReactElement[])
    : (props.bottom && [props.bottom]) || [];

  const [drawer, toggleDrawer] = React.useState<boolean>(false);
  const [activeDrawer, updateActiveDrawer] = React.useState(0);

  const onOpen = (v: React.ReactElement, index: number, close: boolean, toggle: () => void) => {
    if (close) {
      toggle();
      toggleDrawer(false);
      return;
    }
    if (((v.type as unknown) as { displayName: string }).displayName !== 'Menu') {
      return;
    }
    !drawer && toggle();
    updateActiveDrawer(index);
    setTimeout(() => toggleDrawer(true), 200);
  };

  return (
    <ThemeConsumer>
      {(theme) => (
        <SidePanelContext.Consumer>
          {({ width, toggle }) => {
            const css = style(theme, width);
            return (
              <>
                <div className={classes(css.container, css['elevation2'])}>
                  <Row gutter={[0, '0 5px 0 5px']}>
                    <Col flex="0 1 60px" className={css['elevation3']}>
                      {props.logo && <div className={css.logo}>{props.logo}</div>}
                      {children.map((v, i) => (
                        <div className={css.item} key={`item-${i}`} onClick={() => onOpen(v, i, false, toggle)}>
                          {v?.props?.anchor || v}
                        </div>
                      ))}
                    </Col>
                    {drawer && (
                      <Col flex="1 0 auto" className={css.drawer}>
                        <TabPanelContainer
                          activeKey={String(activeDrawer)}
                          titles={children.concat(bottom).map((_, i) => ({ title: '', key: String(i) }))}
                        >
                          {children.concat(bottom).map((v, i) => (
                            <Menu key={`drawer-${i}`} elevation={0} anchor={<button />} mode="vertical">
                              {v.props.children}
                            </Menu>
                          ))}
                        </TabPanelContainer>
                      </Col>
                    )}
                  </Row>
                  <div className={css.resizer}>
                    <Button
                      onClick={() => onOpen(children[0], activeDrawer, !!drawer, toggle)}
                      shape="circle"
                      size="small"
                      icon={drawer ? <MdChevronLeft /> : <MdChevronRight />}
                      primary
                    />
                  </div>
                  {!drawer && <div className={css.line} />}
                </div>
                <div className={css.bottom}>
                  {bottom.map((v, i) => (
                    <div
                      className={css.item}
                      key={`item-${i}`}
                      onClick={() => onOpen(v, children.length + i, false, toggle)}
                    >
                      {v.props?.anchor || v}
                    </div>
                  ))}
                </div>
              </>
            );
          }}
        </SidePanelContext.Consumer>
      )}
    </ThemeConsumer>
  );
};

const style = (theme: Theme, width: number) => {
  const background = theme.background;
  const color = getColor(background);
  return stylesheet({
    ...elevations(theme),
    container: {
      position: 'fixed',
      width: width + 'px',
      flex: `0 1 60px`,
      maxHeight: '100%',
      color,
      background,
      transition: '.3s all',
      overflow: 'auto',
      zIndex: 1,
      left: 0,
      top: 0,
      overflowX: 'visible',
      overflowY: 'auto',
    },
    logo: {
      cursor: 'pointer',
      margin: 'auto',
      marginTop: '20px',
      $nest: {
        svg: {
          width: '100%',
        },
      },
    },
    item: {
      margin: '20px 0',
      color,
      $nest: {
        '*': {
          color,
          $nest: {
            '&:hover': {
              color,
            },
          },
        },
      },
    },
    drawer: {
      height: '100vh',
      overflow: 'auto',
    },
    resizer: {
      position: 'fixed',
      top: '20px',
      left: width - 10 + 'px',
    },
    line: {
      position: 'fixed',
      height: '110vh',
      left: width / 2 + 'px',
      width: '2px',
      background: theme.primary,
    },
    bottom: {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '60px',
      background,
      zIndex: 2,
    },
  });
};

export interface SidePanelProps {
  children: React.ReactElement[] | React.ReactElement;
  bottom?: React.ReactElement[] | React.ReactElement;
  logo?: React.ReactNode;
}

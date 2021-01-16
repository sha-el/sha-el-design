import * as React from 'react';
import { Col, Row } from '../Grid';
import { Menu } from '../Menu';
import { Button } from '../Button';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { SidePanelContext } from './Container';
import { TabPanelContainer } from '../Tabs';
import { classes } from '../../helpers';
import { sidePanel as style } from './style';
import { useTheme } from '../Theme/Theme';

export const SidePanel: React.FC<SidePanelProps> = (props) => {
  return (
    <SidePanelContext.Consumer>
      {({ width, toggle }) => {
        return <Inner {...props} width={width} toggle={toggle} />;
      }}
    </SidePanelContext.Consumer>
  );
};

const Inner: React.FC<InnerProps> = (props) => {
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

  const { width, toggle } = props;

  const theme = useTheme();
  const css = style({ theme, width });

  return (
    <>
      <div className={classes(css.container, css['elevation2'])}>
        <Row gutter={[0, '0 5px 0 5px']} style={{ overflowX: 'hidden', maxWidth: width + 'px' }} wrap="nowrap">
          <Col flex="0 0 60px" className={css['elevation3']}>
            {props.logo && <div className={css.logo}>{props.logo}</div>}
            {children.map((v, i) => (
              <div className={css.item} key={`item-${i}`} onClick={() => onOpen(v, i, false, toggle)}>
                {v?.props?.anchor || v}
              </div>
            ))}
          </Col>
          {drawer && (
            <Col flex="0 0 190px" className={css.drawer}>
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
          <div className={css.item} key={`item-${i}`} onClick={() => onOpen(v, children.length + i, false, toggle)}>
            {v.props?.anchor || v}
          </div>
        ))}
      </div>
    </>
  );
};

export interface SidePanelProps {
  children: React.ReactElement[] | React.ReactElement;
  bottom?: React.ReactElement[] | React.ReactElement;
  logo?: React.ReactNode;
}

interface InnerProps extends SidePanelProps {
  width: number;
  toggle: () => void;
}

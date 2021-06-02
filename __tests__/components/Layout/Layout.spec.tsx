import React from 'react';
import { Md3DRotation, MdAccessTime, MdAccountBox, MdAcUnit, MdHome, MdSettings, MdVerifiedUser } from 'react-icons/md';
import {
  Button,
  Card,
  Container,
  Content,
  Divider,
  List,
  ListItem,
  Menu,
  MenuItem,
  Popover,
  SidePanel,
} from '../../../src';

import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';

const CreateLayout = () => (
  <Container>
    <SidePanel
      logo={<Md3DRotation size="50px" />}
      bottom={[
        <Popover
          key="bottom-2"
          position="right"
          trigger="onHover"
          style={{ child: { display: 'block' } }}
          animation="zoom"
          content={
            <List>
              <ListItem>user option 1</ListItem>
              <ListItem>user option 2</ListItem>
              <ListItem>user option 3</ListItem>
            </List>
          }
        >
          <Button size="big" displayBlock flat primary icon={<MdVerifiedUser />} />
        </Popover>,
        <Button key="bottom-1" size="big" displayBlock flat icon={<MdSettings />} />,
      ]}
    >
      <Menu anchor={<Button icon={<MdAcUnit />} flat displayBlock size="big" />}>
        <MenuItem icon={<MdHome />}>Home</MenuItem>
        <MenuItem icon={<MdHome />} active>
          NAV 1
        </MenuItem>
        <MenuItem icon={<Md3DRotation />}>NAV 2</MenuItem>
        <MenuItem icon={<MdAccountBox />}>NAV 3</MenuItem>
      </Menu>
      <Divider />
      <Button size="big" displayBlock flat icon={<MdAccessTime />} />
    </SidePanel>
    <Content>
      <Card>Container</Card>
    </Content>
  </Container>
);

describe('Layout', () => {
  it('Should render a layout', () => {
    render(<CreateLayout />);

    const container = document.querySelector('.sha-el-conatiner');
    expect(container).toBeDefined();
    expect(container).toHaveStyle(`
      display: flex;
      position: relative;
    `);

    const sidePanel = container.querySelector('.sha-el-side-panel');
    expect(sidePanel).toBeDefined();
    expect(sidePanel).toHaveStyle(`
      box-shadow: 0px 3px 1px -2px rgba(34,41,47,0.12),0px 2px 2px 0px rgba(34,41,47,0.08),0px 1px 5px 0px rgba(34,41,47,0.05);
    `);
    expect(sidePanel).toHaveStyle(`
      position: fixed;
      width: 60px;
      flex: 0 1 60px;
      max-height: 100%;
      color: #555555;
      background: #ffffff;
      transition: .3s all;
      overflow: auto;
      left: 0;
      top: 0;
      overflow-x: visible;
      overflow-y: auto;
      z-index: 0;
    `);

    const sidePanelBottom = container.querySelector('.sha-el-side-panel-bottom');
    expect(sidePanelBottom).toBeDefined();
    expect(sidePanelBottom).toHaveStyle(`
      position: fixed;
      bottom: 0;
      left: 0;
      width: 60px;
      background: #ffffff;
      z-index: 0;
    `);

    const content = container.querySelector('main');
    expect(content).toBeDefined();
    expect(content).toHaveStyle(`
      position: relative;
      min-width: 0;
      flex: 1 0 auto;
      min-height: 100%;
      width: calc(100% - 110px);
      margin: 5px 5px 5px 70px;
    `);
  });

  it('Should show & hide resizer on mouse enter & leave', () => {
    render(<CreateLayout />);

    const container = document.querySelector('.sha-el-conatiner');
    const sidePanel = container.querySelector('.sha-el-side-panel');

    let resizer = sidePanel.querySelector('.resizer');
    expect(resizer.innerHTML).toBe('');
    expect(resizer).toHaveStyle(`
      position: fixed;
      top: 20px;
      left: 50px;
    `);

    act(() => {
      fireEvent.mouseEnter(sidePanel);
    });

    resizer = sidePanel.querySelector('.resizer');
    expect(resizer.innerHTML).not.toBe('');

    const resizerButton = resizer.querySelector('button');
    expect(resizerButton).toBeDefined();
    expect(resizerButton.querySelector('svg').innerHTML).toContain('M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'); // Path for MdChevronRight

    act(() => {
      fireEvent.mouseLeave(sidePanel);
    });

    resizer = sidePanel.querySelector('.resizer');
    expect(resizer.innerHTML).toBe('');
  });

  it('Should check line between sidepanel and bottom', () => {
    render(<CreateLayout />);

    const container = document.querySelector('.sha-el-conatiner');
    const sidePanel = container.querySelector('.sha-el-side-panel');

    const line = sidePanel.querySelector('.line');
    expect(line).toBeDefined();
    expect(line).toHaveStyle(`
    position: fixed;
    height: 110vh;
    left: 30px;
    width: 2px;
    background: #536DFE;
    `);
  });

  it('Should open sidepanel', () => {
    jest.useFakeTimers();
    render(<CreateLayout />);

    const container = document.querySelector('.sha-el-conatiner');
    const sidePanel = container.querySelector('.sha-el-side-panel');

    act(() => {
      fireEvent.mouseEnter(sidePanel);
    });
    let resizerButton = sidePanel.querySelector('.resizer').querySelector('button');
    act(() => {
      fireEvent.click(resizerButton);
    });

    act(() => {
      jest.runAllTimers();
    });

    resizerButton = sidePanel.querySelector('.resizer').querySelector('button');
    expect(resizerButton.innerHTML).toContain('M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'); // Path for MdChevronLeft

    const line = sidePanel.querySelector('.line');
    expect(line).toBeNull();

    expect(sidePanel).toHaveStyle(`
      width: 250px;
    `);

    expect(sidePanel.querySelector('.resizer')).toHaveStyle(`
      left: 240px;
    `);

    const content = container.querySelector('main');
    expect(content).toHaveStyle(`
      width: calc(100% - 300px);
      margin: 5px 5px 5px 260px;
    `);

    const sidePanelRow = sidePanel.querySelector('.sha-el-row');
    expect(sidePanelRow).toBeDefined();
    expect(sidePanelRow).toHaveStyle(`
      overflow-x: hidden;
      max-width: 250px;
    `);

    const sidePanelContent = sidePanelRow.querySelectorAll('.sha-el-col')[0];
    expect(sidePanelContent).toHaveStyle(`
      padding: 0px 5px;
      flex: 0 0 60px;
    `);

    const logo = sidePanelContent.querySelector('div');
    expect(logo).toHaveStyle(`
      cursor: pointer;
      margin: 20px auto auto auto;
    `);
    expect(logo.querySelector('svg')).toHaveStyle(`
      width: 100%;
    `);
    expect(logo.querySelector('svg').innerHTML).toContain(
      'M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z',
    );

    expect(sidePanelContent.querySelectorAll('div').length).toBe(5);
    expect(sidePanelContent.querySelectorAll('button').length).toBe(2);

    const drawer = sidePanelRow.querySelector('.drawer');
    expect(drawer).toBeDefined();
    expect(drawer).toHaveStyle(`
      flex: 0 0 190px;
    `);

    let activeDrawer = drawer.querySelector('[x="0"]');
    expect(activeDrawer.querySelectorAll('li').length).toBe(4);

    act(() => {
      fireEvent.click(sidePanelContent.querySelectorAll('button')[1]);
    });
    activeDrawer = drawer.querySelector('[x="0"]');
    expect(activeDrawer.querySelectorAll('li').length).toBe(4); // Should not change active drawer since it's not a menu component
  });

  it('Should close sidepanel', () => {
    jest.useFakeTimers();
    render(<CreateLayout />);

    const container = document.querySelector('.sha-el-conatiner');
    const sidePanel = container.querySelector('.sha-el-side-panel');

    //Open the sidepanel first
    act(() => {
      fireEvent.mouseEnter(sidePanel);
    });
    let resizerButton = sidePanel.querySelector('.resizer').querySelector('button');
    act(() => {
      fireEvent.click(resizerButton);
    });

    act(() => {
      jest.runAllTimers();
    });

    resizerButton = sidePanel.querySelector('.resizer').querySelector('button');
    act(() => {
      fireEvent.click(resizerButton);
    });

    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.mouseEnter(sidePanel);
    });
    resizerButton = sidePanel.querySelector('.resizer').querySelector('button');
    expect(resizerButton.querySelector('svg').innerHTML).toContain('M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'); // Path for MdChevronRight

    const line = sidePanel.querySelector('.line');
    expect(line).toBeDefined();

    expect(sidePanel).toHaveStyle(`
      width: 60px;
    `);

    expect(sidePanel.querySelector('.resizer')).toHaveStyle(`
      left: 50px;
    `);

    const content = container.querySelector('main');
    expect(content).toHaveStyle(`
      width: calc(100% - 110px);
      margin: 5px 5px 5px 70px;
    `);
  });

  it('Should check sidepanel bottom children', () => {
    render(<CreateLayout />);

    const sidePanelBottom = document.querySelector('.sha-el-side-panel-bottom');
    expect(sidePanelBottom.querySelectorAll('div').length).toBe(3);

    const item = sidePanelBottom.querySelector('div');
    expect(item).toHaveStyle(`
      margin: 20px 0;
      color: #555555;
    `);
    const popover = item.querySelector('.popover-element');
    expect(popover).toBeDefined();

    const settingButton = sidePanelBottom.querySelector('button');
    act(() => {
      fireEvent.click(settingButton);
    });
    expect(document.querySelector('.drawer')).toBeNull();
  });

  it('Should render a sidepanel with single children', () => {
    render(
      <Container>
        <SidePanel logo={<Md3DRotation size="50px" />}>
          <Button size="big" displayBlock flat icon={<MdAccessTime />} />
        </SidePanel>
        <Content>
          <Card>Container</Card>
        </Content>
      </Container>,
    );

    const sidePanelContent = document.querySelectorAll('.sha-el-col')[0];
    expect(sidePanelContent.querySelectorAll('div').length).toBe(2);
    expect(sidePanelContent.querySelectorAll('button').length).toBe(1);

    const sidePanelBottom = document.querySelector('.sha-el-side-panel-bottom');
    expect(sidePanelBottom.innerHTML).toBe('');
  });

  it('Should render a sidepanel with single bottom', () => {
    render(
      <Container>
        <SidePanel
          logo={<Md3DRotation size="50px" />}
          bottom={<Button key="bottom-1" size="big" displayBlock flat icon={<MdSettings />} />}
        >
          <Button size="big" displayBlock flat icon={<MdAccessTime />} />
        </SidePanel>
        <Content>
          <Card>Container</Card>
        </Content>
      </Container>,
    );

    const sidePanelBottom = document.querySelector('.sha-el-side-panel-bottom');
    expect(sidePanelBottom.querySelectorAll('div').length).toBe(1);
  });

  // it('Should change sidePanelWidth', () => {
  //   render(<CreateLayout sidePanelWidth={100} />);
  // });
});

// width

// check content not to be dispalyed by the drawer if it's not a menu component
// check mouse enter and mouse leave : it is basically a replacement of hover for an entire component
// check custom width everywhere (specially in sidepanel and content style) ref => width in container
// NOTE: width changes everywhere when SidePanel is toggled
// test drawer thing in sidepanel : when we open sidepanel only then we can test the drawer
// should not render a line while drawer is open
// check single childer branching
// should open sidepanel when clicked on a childern
/*
 **
 ** Drawer not opening
 **
 */

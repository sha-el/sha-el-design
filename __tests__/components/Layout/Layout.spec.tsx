import React from 'react';
import { MdSupervisorAccount } from 'react-icons/md';
import { Card, CollapsibleList, Container, Content, Divider, List, ListItem, Sidebar } from '../../../src';

import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { FcSelfie } from 'react-icons/fc';
import { VscMail, VscSmiley } from 'react-icons/vsc';
import { GiPerspectiveDiceSixFacesTwo } from 'react-icons/gi';

beforeAll(() => {
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

const CreateLayout = (props: {
  drawerOpen?: boolean;
  updateDrawerOpen?: (e: boolean) => void;
  onWidthChange?: (e: boolean) => void;
}) => (
  <Container sidePanelInitialWidth={65}>
    <Sidebar
      responsive
      drawerOpen={props?.drawerOpen}
      onDrawerChange={props?.updateDrawerOpen}
      placement="left"
      brandIcon={<FcSelfie style={{ width: '65px', height: '50px' }} />}
      brandText="Sha el Design"
      collapsedWidth={65}
      expandWidth={260}
      onWidthChange={props.onWidthChange}
      bottom={
        <List elevation={0}>
          <CollapsibleList
            header="My Account"
            avatar={<MdSupervisorAccount style={{ width: '30px', height: '30px' }} />}
          >
            <List elevation={0}>
              <ListItem avatar={<GiPerspectiveDiceSixFacesTwo />}>Change Password</ListItem>
            </List>
          </CollapsibleList>
        </List>
      }
    >
      <List elevation={0}>
        <CollapsibleList header="Email" avatar={<VscMail style={{ width: '30px', height: '30px' }} />}>
          <ListItem>Add Email</ListItem>
          <ListItem>Email List</ListItem>
          <ListItem>Email Status</ListItem>
        </CollapsibleList>
        <Divider />
        <ListItem element={<a />} selected avatar={<VscSmiley style={{ width: '30px', height: '30px' }} />}>
          All users
        </ListItem>
      </List>
    </Sidebar>
    <Content>
      <Card>Container</Card>
    </Content>
  </Container>
);

describe('Layout', () => {
  it('Should render a layout', async () => {
    window.resizeTo(1300, 100);
    await act(async () => {
      render(<CreateLayout />);
    });

    const container = document.querySelector('.sha-el-conatiner');
    expect(container).toBeDefined();
    expect(container).toHaveStyle(`
      display: flex;
      position: relative;
    `);

    const sideBar = container.querySelector('.sha-el-sidebar');
    expect(sideBar).toBeDefined();
    expect(sideBar).toHaveStyle(`
      box-shadow: 0px 7px 8px -4px rgba(34,41,47,0.12),0px 12px 17px 2px rgba(34,41,47,0.08),0px 5px 22px 4px rgba(34,41,47,0.05);
    `);
    expect(sideBar).toHaveStyle(`
      padding: 10px;
      height: calc(100vh - 0px);
      background: #ffffff;
      position: fixed;
      left: 0;
      top: 0;
      width: 65px;
      transition: .4s ease;
      overflow-x: hidden;
      overflow-y: hidden;
      z-index: 1;
    `);

    const sideBarBottom = container.querySelector('.sidebar-bottom');
    expect(sideBarBottom).toBeDefined();
    expect(sideBarBottom).toHaveStyle(`
      position: fixed;
      bottom: 0;
      left: 10px;
      width: 65px;
      z-index: 1;
    `);

    const content = container.querySelector('main');
    expect(content).toBeDefined();
    expect(content).toHaveStyle(`
      position: relative;
      min-width: 0;
      flex: 1;
      min-height: 100%;
      margin-left: 85px;
    `);
  });

  it('Should render sideBar bottom children', async () => {
    window.resizeTo(1300, 100);
    await act(async () => {
      render(<CreateLayout />);
    });

    const sideBarBottom = document.querySelector('.sidebar-bottom');

    expect(sideBarBottom).toHaveStyle(`
      position: fixed;
      bottom: 0;
      left: 10px;
      z-index: 1;
      width: 65px;
      transition: .4s ease;
    `);
  });

  it('should fix width of sidebar on switch click', async () => {
    window.resizeTo(1300, 100);
    await act(async () => {
      render(<CreateLayout />);
    });

    const sideBar = document.querySelector('.sha-el-sidebar');
    const switchEl = document.querySelector('.sha-el-switch');

    act(() => {
      fireEvent.click(switchEl);
    });

    expect(sideBar).toHaveStyle(`
    width: 260px
    `);
  });

  it('fires an event on sidepanel mouse enter and leave', async () => {
    window.resizeTo(1300, 100);
    const fn = jest.fn();
    await act(async () => {
      render(<CreateLayout onWidthChange={fn} />);
    });

    const sideBar = document.querySelector('.sha-el-sidebar');

    act(() => {
      fireEvent.mouseEnter(sideBar);
    });

    expect(fn).toBeCalledWith(true);

    act(() => {
      fireEvent.mouseLeave(sideBar);
    });

    expect(fn).toBeCalledWith(false);
  });

  it('should close all collapse on mouse leave', async () => {
    window.resizeTo(1300, 100);
    const fn = jest.fn();
    await act(async () => {
      render(<CreateLayout onWidthChange={fn} />);
    });

    const sideBar = document.querySelector('.sha-el-sidebar');

    act(() => {
      fireEvent.mouseEnter(sideBar);
    });

    expect(fn).toBeCalledWith(true);

    act(() => {
      fireEvent.click(document.querySelector('.list-item'));
    });

    expect(document.querySelector('.collapsible-item').innerHTML).toContain('Add Email');

    act(() => {
      fireEvent.mouseLeave(sideBar);
    });

    expect(document.querySelector('.collapsible-item').innerHTML).not.toContain('Add Email');
  });

  it('should render drawer for mobile', async () => {
    jest.useFakeTimers();
    const drawerChangeHandler = jest.fn();
    window.resizeTo(1000, 100);
    await act(async () => {
      render(<CreateLayout drawerOpen={true} updateDrawerOpen={drawerChangeHandler} />);
    });

    await act(async () => {
      fireEvent.click(document.querySelector('.sha-el-drawer'));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.sha-el-drawer')).not.toBeNull();
    expect(drawerChangeHandler).toBeCalledWith(false);

    act(() => {
      fireEvent.click(document.querySelector('.collapsible-list'));
    });

    expect(document.querySelector('.collapsible-item')).toHaveStyle(`
      max-height: 100vh;
    `);
  });
});

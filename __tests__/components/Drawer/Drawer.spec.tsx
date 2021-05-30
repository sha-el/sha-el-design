import React from 'react';
import { Button, Drawer } from '../../../src';

import '@testing-library/jest-dom';
import { fireEvent, render, act } from '@testing-library/react';

const CreateDrawer = (props: {
  isOpen?: boolean;
  isStyle?: boolean;
  placement?: 'right' | 'left' | 'bottom' | 'top';
}) => {
  const [open, update] = React.useState(!!props.isOpen);
  return (
    <>
      <Button onClick={() => update(!open)}>Open</Button>
      <Drawer
        style={props.isStyle && { background: 'orange' }}
        placement={props.placement || 'right'}
        isVisible={open}
        onClose={() => update(!open)}
      >
        <div>Hello, World!</div>
      </Drawer>
    </>
  );
};

describe('Drawer', () => {
  it('Shuould open a simple drawer', () => {
    render(<CreateDrawer />);

    act(() => {
      fireEvent.click(document.querySelector('button'));
    });

    const drawer = document.querySelector('.sha-el-drawer').parentElement;
    expect(drawer.querySelectorAll('div')[0]).toHaveStyle(`
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
    `);
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      position: fixed;
      box-sizing: border-box;
      background: #ffffff;
      z-index: 2;
      height: 100%;
      overflow-y: auto;
      overflow-x: auto;
    `);
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      right: 0;
      top: 0;
      width: auto;
      height: 100%;
      animation: animation-jrgenw 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    `);
  });

  it('Should close a drawer', () => {
    jest.useFakeTimers();
    render(<CreateDrawer isOpen={true} />);

    let drawerMask = document.querySelector('.sha-el-drawer');

    expect(drawerMask.parentElement.querySelectorAll('div')[1].classList.length).toBe(7);

    act(() => {
      fireEvent.click(drawerMask);
    });

    expect(drawerMask.parentElement.querySelectorAll('div')[1].classList.length).toBe(8);

    act(() => {
      jest.runAllTimers();
    });

    drawerMask = document.querySelector('.sha-el-drawer');
    expect(drawerMask).toBeNull();
  });

  it('Should render a drawer with onClose prop', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    render(
      <Drawer isVisible onClose={fn}>
        <div>Hello, World!</div>
      </Drawer>,
    );

    act(() => {
      fireEvent.click(document.querySelector('.sha-el-drawer'));
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(fn).toBeCalledTimes(1);
  });

  it('Should render a drawer with custom styles', () => {
    render(<CreateDrawer isOpen isStyle />);

    const drawer = document.querySelector('.sha-el-drawer').parentElement;
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      background: orange;
    `);
  });

  it('Should open a drawer in left', () => {
    render(<CreateDrawer placement="left" />);

    act(() => {
      fireEvent.click(document.querySelector('button'));
    });

    const drawer = document.querySelector('.sha-el-drawer').parentElement;
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      left: 0;
      width: auto;
      height: 100%;
      top: 0;
      animation: animation-1lgtpsr 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    `);
  });

  it('Should open a drawer in bottom', () => {
    render(<CreateDrawer placement="bottom" />);

    act(() => {
      fireEvent.click(document.querySelector('button'));
    });

    const drawer = document.querySelector('.sha-el-drawer').parentElement;
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      bottom: 0;
      width: 100%;
      height: auto;
      left: 0;
      animation: animation-16uu6p2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    `);
  });

  it('Should open a drawer in top', () => {
    render(<CreateDrawer placement="top" />);

    act(() => {
      fireEvent.click(document.querySelector('button'));
    });

    const drawer = document.querySelector('.sha-el-drawer').parentElement;
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      top: 0;
      width: 100%;
      height: auto;
      left: 0;
      animation: animation-fv4k3y 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    `);
  });

  it('Should open a drawer with padding, border & elevation', () => {
    render(
      <Drawer isVisible padding={22} elevation={20} border={4}>
        <div>Hello, World!</div>
      </Drawer>,
    );

    const drawer = document.querySelector('.sha-el-drawer').parentElement;
    expect(drawer.querySelectorAll('div')[1]).toHaveStyle(`
      border: 2px solid hsla(0,0%,0%,.2);
      box-shadow: 0px 10px 13px -6px rgba(34,41,47,0.12),0px 20px 31px 3px rgba(34,41,47,0.08),0px 8px 38px 7px rgba(34,41,47,0.05);
      padding: 22px;
    `);
  });
});

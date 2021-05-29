import React from 'react';
import { Button, Modal } from '../../../src';

import '@testing-library/jest-dom';
import { fireEvent, render, act } from '@testing-library/react';

const CreateModal = () => {
  const [isVisible, toggle] = React.useState(false);

  return (
    <>
      <Button onClick={() => toggle(!isVisible)}>Click here</Button>
      <Modal isVisible={isVisible} onClose={() => toggle(false)}>
        <div>Hello, World!</div>
      </Modal>
    </>
  );
};

describe('Modal', () => {
  it('should render a modal', () => {
    render(
      <Modal isVisible={true}>
        <div>Hello, World!</div>
      </Modal>,
    );

    const modalMask = document.querySelector('.sha-el-modal');

    expect(modalMask).toBeDefined();
    expect(modalMask).toHaveStyle(`
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .5);
      z-index: 2;
    `);

    const modalContainer = modalMask.querySelector('div');
    expect(modalContainer).toHaveStyle(`
      max-height: 70vh;
      background: hsl(0, 0%, 92%);
      z-index: 2;
      top: 10vh;
      overflow-y: auto;
      animation: animation-16uu6p2 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      border-radius: 2px;
      width: '99vw'
    `);

    const modalContent = modalContainer.querySelector('div');
    expect(modalContent.innerHTML).toBe('<div>Hello, World!</div>');
  });

  it('Should check modal click and propagation', () => {
    const fn = jest.fn();

    render(
      <Modal isVisible={true} onClose={fn}>
        <div>Hello, World!</div>
      </Modal>,
    );

    const modalMask = document.querySelector('.sha-el-modal');

    act(() => {
      fireEvent.click(modalMask);
    });

    expect(fn).toBeCalledTimes(1);

    act(() => {
      fireEvent.click(modalMask.querySelector('div'));
    });

    expect(fn).toBeCalledTimes(1);
  });

  it('Should open and close modal', () => {
    jest.useFakeTimers();

    render(<CreateModal />);

    let modalMask = document.querySelector('.sha-el-modal');
    expect(modalMask).toBeNull();

    const button = document.querySelector('button');

    act(() => {
      fireEvent.click(button);
    });

    modalMask = document.querySelector('.sha-el-modal');
    expect(modalMask).toBeDefined();

    act(() => {
      fireEvent.click(modalMask);
    });

    act(() => {
      jest.runAllTimers();
    });

    modalMask = document.querySelector('.sha-el-modal');
    expect(modalMask).toBeNull();
  });

  it('Should not close modal on click', () => {
    render(
      <Modal isVisible={true}>
        <div>Hello, World!</div>
      </Modal>,
    );

    const modalMask = document.querySelector('.sha-el-modal');

    expect(modalMask).toBeDefined();

    act(() => {
      fireEvent.click(modalMask);
    });

    expect(modalMask).toBeDefined();
  });
});

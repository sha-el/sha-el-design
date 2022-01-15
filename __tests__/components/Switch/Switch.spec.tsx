import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from '../../../src/components/Switch/Switch';

describe('Switch', () => {
  it('should render a simple switch', () => {
    render(<Switch />);

    const switchContainer = document.querySelector('.sha-el-switch');
    expect(switchContainer).toHaveStyle(`
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    `);

    expect(switchContainer.querySelector('span')).toHaveStyle(`
      width: 36px;
      height: 14px;
      background: rgba(0, 0, 0, 0.54);
      border-radius: 7px;
      transition: ease-in .1s;
    `);

    expect(switchContainer.querySelectorAll('span')[1]).toHaveStyle(`
      display: inline-flex;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      transform: translateX(0);
      transition: ease-in .1s;
      box-shadow: 0px 2px 4px -1px rgba(34,41,47,0.12),0px 4px 5px 0px rgba(34,41,47,0.08),0px 1px 10px 0px rgba(34,41,47,0.05);
    `);

    expect(switchContainer.querySelectorAll('span')[2]).toHaveStyle(`
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: hsl(230.89999999999998, 98.8%, 74.7%);
      transform: translateX(-9.5px);
      transition: ease-in .1s;
      position: absolute;
      opacity: 0;
    `);
  });

  it('should render a simple checked switch', () => {
    render(<Switch checked onChange={() => ({})} />);

    const switchContainer = document.querySelector('.sha-el-switch');

    expect(switchContainer.querySelector('span')).toHaveStyle(`
      width: 36px;
      height: 14px;
      background: rgb(124, 124, 124);
      border-radius: 7px;
      transition: ease-in .1s;
    `);

    expect(switchContainer.querySelectorAll('span')[1]).toHaveStyle(`
      display: inline-flex;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgb(83, 109, 254);
      transform: translateX(16px);
      transition: ease-in .1s;
      box-shadow: 0px 2px 4px -1px rgba(34,41,47,0.12),0px 4px 5px 0px rgba(34,41,47,0.08),0px 1px 10px 0px rgba(34,41,47,0.05);
    `);

    expect(switchContainer.querySelectorAll('span')[2]).toHaveStyle(`
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgb(124, 124, 124);
      transform: translateX(7px);
      transition: ease-in .1s;
      position: absolute;
      opacity: 0;
    `);
  });

  it('should render a simple checked switch with color', () => {
    render(<Switch color="green" checked onChange={() => ({})} />);

    const switchContainer = document.querySelector('.sha-el-switch');

    expect(switchContainer.querySelector('span')).toHaveStyle(`
      width: 36px;
      height: 14px;
      background: rgb(0, 0, 0);
      border-radius: 7px;
      transition: ease-in .1s;
    `);

    expect(switchContainer.querySelectorAll('span')[1]).toHaveStyle(`
      display: inline-flex;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: green;
      transform: translateX(16px);
      transition: ease-in .1s;
      box-shadow: 0px 2px 4px -1px rgba(34,41,47,0.12),0px 4px 5px 0px rgba(34,41,47,0.08),0px 1px 10px 0px rgba(34,41,47,0.05);
    `);

    expect(switchContainer.querySelectorAll('span')[2]).toHaveStyle(`
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgb(0, 0, 0);
      transform: translateX(7px);
      transition: ease-in .1s;
      position: absolute;
      opacity: 0;
    `);
  });

  it('should render a simple checked switch with size small', () => {
    render(<Switch color="green" size="small" checked onChange={() => ({})} />);

    const switchContainer = document.querySelector('.sha-el-switch');

    expect(switchContainer.querySelector('span')).toHaveStyle(`
      width: 26px;
      height: 10px;
      background: rgb(0, 0, 0);
      border-radius: 7px;
      transition: ease-in .1s;
    `);

    expect(switchContainer.querySelectorAll('span')[1]).toHaveStyle(`
      display: inline-flex;
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: green;
      transform: translateX(12px);
      transition: ease-in .1s;
      box-shadow: 0px 2px 4px -1px rgba(34,41,47,0.12),0px 4px 5px 0px rgba(34,41,47,0.08),0px 1px 10px 0px rgba(34,41,47,0.05);
    `);

    expect(switchContainer.querySelectorAll('span')[2]).toHaveStyle(`
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgb(0, 0, 0);
      transform: translateX(5px);
      transition: ease-in .1s;
      position: absolute;
      opacity: 0;
    `);
  });

  it('input element should be hidden', () => {
    render(<Switch />);

    const switchContainer = document.querySelector('.sha-el-switch');
    expect(switchContainer.querySelector('input')).toHaveStyle(`
      display: none;
    `);
  });

  it('should trigger event on click', () => {
    const fn = jest.fn();

    render(<Switch checked={true} onChange={(e) => fn(e.target.checked)} />);

    fireEvent.click(document.querySelector('.sha-el-switch'));

    expect(fn).toBeCalledWith(false);
  });

  it('should trigger event on pressing space', () => {
    const fn = jest.fn();

    render(<Switch checked={true} onChange={(e) => fn(e.target.checked)} />);

    fireEvent.keyDown(document.querySelector('.sha-el-switch'), { code: 'Space' });

    expect(fn).toBeCalledWith(false);
  });

  it('should not trigger events if disabled', () => {
    const fn = jest.fn();

    render(<Switch checked={true} disabled onChange={(e) => fn(e.target.checked)} />);

    fireEvent.keyDown(document.querySelector('.sha-el-switch'), { code: 'Space' });

    expect(fn).toBeCalledTimes(0);
  });

  it('renders a label', () => {
    render(<Switch label="on" />);

    const switchContainer = document.querySelector('.sha-el-switch');

    expect(switchContainer.querySelector('label')).not.toBeUndefined();

    expect(switchContainer.querySelector('label').innerHTML).toContain('on');
  });
});

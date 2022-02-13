import React from 'react';
import { Progress } from '../../../src';
import { MdSave } from 'react-icons/md';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Progress', () => {
  it('should render a basic progress bar', () => {
    render(<Progress percent={50} color="primary" />);

    const container = document.querySelector('.sha-el-progress');
    expect(container).toHaveStyle(`
    width: 100%;
    min-width: 200px;
    background: rgb(230, 230, 230);
    border-radius: 2px;
    overflow: visible;
    `);

    const progressLine = document.querySelector('.sha-el-progress-line');
    expect(progressLine).toHaveStyle(`
    width: 50%;
    `);
    expect(progressLine).toHaveStyle(`
    height: 10px;
    line-height: 10px;
    background: #536DFE;
    border-radius: 0 2px 2px 0;
    transition: all .4s cubic-bezier(.08,.82,.17,1) 0s;
    `);
  });

  it('should render a progress circle with label', () => {
    render(<Progress type="circle" percent={50} label="50%" />);

    const container = document.querySelectorAll('div')[4];
    expect(container).toHaveStyle(`
      position: relative;
      display: inline-block;
    `);

    expect(container.querySelector('svg')).toHaveStyle(`
      width: 120;
      height: 120;
    `);

    const progressCircle = container.querySelector('circle');
    expect(progressCircle).toHaveStyle(`
      stroke-dasharray: 326.7256359733385 326.7256359733385;
      stroke-dashoffset: 163.36281798666926;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    `);
    expect(progressCircle).toHaveAttribute('stroke', '#536DFE');
    expect(progressCircle).toHaveAttribute('stroke-width', '10px');
    expect(progressCircle).toHaveAttribute('fill', 'transparent');
    expect(progressCircle).toHaveAttribute('r', '52');
    expect(progressCircle).toHaveAttribute('cx', '60');
    expect(progressCircle).toHaveAttribute('cy', '60');

    expect(document.querySelector('span')).toHaveStyle(`
      position: absolute;
      top: 45%;
      text-align: center;
      width: 100%;
    `);
    expect(document.querySelector('span').innerHTML).toBe('50%');
  });

  it('should render a progress circle with custom percent', () => {
    render(<Progress type="circle" percent={65} />);

    expect(document.querySelector('circle')).toHaveStyle(`
      stroke-dasharray: 326.7256359733385 326.7256359733385;
      stroke-dashoffset: 114.35397259066846;
    `);
  });

  it('should render a progress bar with label', () => {
    render(<Progress percent={50} label="Hello" />);

    const label = document.querySelectorAll('.sha-el-col')[1];
    expect(label.innerHTML).toBe('Hello');
  });

  it('should render a progress bar with icon as label', () => {
    render(<Progress percent={50} label={<MdSave />} />);

    const label = document.querySelector('svg').innerHTML;
    expect(label).toContain(
      // Path for save svg
      '<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>',
    );
  });

  it('should render a progress bar with custom percent', () => {
    render(<Progress percent={65} color="primary" />);

    const progressLine = document.querySelector('.sha-el-progress-line');
    expect(progressLine).toHaveStyle(`
      width: 65%;
    `);
  });

  it('should render a secondary progress bar', () => {
    render(<Progress percent={50} color="secondary" />);

    const progressLine = document.querySelector('.sha-el-progress-line');
    expect(progressLine).toHaveStyle(`
      background: #f06292;
    `);
  });

  it('should render a warning progress bar', () => {
    render(<Progress percent={50} color="warning" />);

    const progressLine = document.querySelector('.sha-el-progress-line');
    expect(progressLine).toHaveStyle(`
      background: #ff9800;
    `);
  });

  it('should render an error progress bar', () => {
    render(<Progress percent={50} color="error" />);

    const progressLine = document.querySelector('.sha-el-progress-line');
    expect(progressLine).toHaveStyle(`
      background: #f44336;
    `);
  });

  it('should render an info progress bar', () => {
    render(<Progress percent={50} color="info" />);

    const progressLine = document.querySelector('.sha-el-progress-line');
    expect(progressLine).toHaveStyle(`
      background: #2196f3;
    `);
  });
});

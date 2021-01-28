import React from 'react';
import { Stepper, Step } from '../../../src';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MdHome, MdClearAll } from 'react-icons/md';

const renderStep = (current?: number) =>
  render(
    <Stepper current={current}>
      <Step error="Error" title="1" description="This is a description text" key="1" icon={<MdHome />}>
        Step 1
      </Step>
      <Step disabled title="Enter Step 2" key="2">
        Step 2
      </Step>
      <Step key="3" title="3" icon={<MdClearAll />}>
        Step 3
      </Step>
    </Stepper>,
  );

const renderNonLinearStep = (current?: number, onChange?: (e: number) => void) =>
  render(
    <Stepper nonLinear onChange={onChange} current={current}>
      <Step icon={<MdHome title="icon" />} title="1">
        Step 1
      </Step>
      <Step title="Title 2">Step 2</Step>
      <Step>Step 3</Step>
    </Stepper>,
  );

describe('Stepper', () => {
  it('should render a simple stepper with 3 steps', () => {
    renderStep();

    const row = document.querySelector('.sha-el-row');
    const carousel = document.body.children[2].children[1];

    // 3 icons, 3 title and 2 <Divider />
    expect(row.children.length).toBe(3 + 3 + 2);
    expect(carousel.children[0].children.length).toBe(3);
  });

  it('should render a step with error', () => {
    renderStep();

    const row = document.querySelector('.sha-el-row');

    expect(row.children[0]).toHaveStyle(`
      color: rgb(244, 67, 54);
    `);

    expect(row.children[1]).toHaveStyle(`
      color: rgb(244, 67, 54);
    `);
  });

  it('should render a disabled step', () => {
    renderStep();

    const row = document.querySelector('.sha-el-row');

    expect(row.children[3]).toHaveStyle(`
      color: rgba(0, 0, 0, 0.38);
    `);

    expect(row.children[4]).toHaveStyle(`
      color: rgba(0, 0, 0, 0.38);
    `);
  });

  it('should render a non linear stepper', () => {
    let currentStep = -1;
    const updateCurrentStep = (e: number) => (currentStep = e);

    renderNonLinearStep(0, updateCurrentStep);

    fireEvent.click(screen.getByText('3'));
    expect(currentStep).toBe(2);

    fireEvent.click(screen.getByText('Title 2'));
    expect(currentStep).toBe(1);

    fireEvent.click(screen.getByTitle('icon'));
    expect(currentStep).toBe(0);

    expect(screen.getByText('1')).toHaveStyle(`
      color: rgb(83, 109, 254);
    `);
  });

  it('should render `MdCheck` on Completed steps', () => {
    renderStep(3);

    expect(document.querySelector('.sha-el-row').children[6]).toHaveStyle(`
      color: rgb(33, 150, 243);
    `);
  });

  it('should render a step', () => {
    render(<Step>Hello</Step>);

    expect(screen.getByText('Hello').innerHTML).toBe('Hello');
  });
});

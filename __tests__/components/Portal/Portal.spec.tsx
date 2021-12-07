import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import { Portal } from '../../../src';
import { PortalProps } from '../../../src/components/Portal/Portal';

function portal(args: Partial<PortalProps>) {
  return <Portal {...args} />;
}

describe('Portal', () => {
  it('should create a div', () => {
    render(portal({}));

    expect(document.querySelector('sha-el-portal')).toBeDefined();
  });

  it('should create the div on passed dom element', () => {
    const dom = document.createElement('div');
    dom.id = 'testing';
    document.body.appendChild(dom);

    render(portal({ dom, children: <h1>hello</h1> }));

    expect(dom.querySelector('h1')).toBeDefined();
  });

  it('should not render if document in not defined', () => {
    jest.useFakeTimers();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const document = (global as any).document;
    global.document = undefined;
    render(portal({}));

    jest.runAllTimers();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).document = document;
    jest.runAllTimers();

    expect(document.querySelector('sha-el-portal')).toBeDefined();
  });
});

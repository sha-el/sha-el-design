import React from 'react';
import { CollapsibleList, List, ListItem } from '../../../src';
import { Md3DRotation, MdAcUnit } from 'react-icons/md';

import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';

describe('List', () => {
  it('should render a basic list', () => {
    render(
      <List>
        <ListItem avatar={<MdAcUnit />}>Basic Item List 1</ListItem>
        <ListItem avatar={<Md3DRotation />}>Basic Item List 2</ListItem>
      </List>,
    );

    const ul = document.querySelector('ul');
    expect(ul).toHaveStyle(`
      padding: 8px 0;
      margin: 0;
      list-style: none;
      width: 100%;
      box-sizing: border-box;
      border-radius: 6px;
      background: #ffffff;
      display: block;
      border-collapse: collapse;
    `);

    const listItems = ul.querySelectorAll('.list-item');

    expect(listItems[0]).toHaveStyle(`
      align-items: center;
      display: flex;
      background: #ffffff;
      border-collapse: collapse;
      padding: 0px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      list-style: none;
      overflow: hidden;
    `);

    expect(listItems[0].querySelectorAll('div')[0]).toHaveStyle(`
      flex: 0 1 auto;
      padding: 12px 16px 12px 18px;
      margin: 0px;
    `);
    expect(listItems[0].querySelector('svg').innerHTML).toContain(
      // Path for cross svg.
      'M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z',
    );

    expect(listItems[0].querySelectorAll('div')[1]).toHaveStyle(`
      flex: 1 0 auto;
      padding: 12px 16px 12px 18px;
      margin: 0px;
    `);
    expect(listItems[0].querySelectorAll('div')[2].innerHTML).toBe('Basic Item List 1');

    // Last child
    expect(listItems[1]).toHaveStyle(`
      border: none; 
    `);
    expect(listItems[1].querySelectorAll('div')[2].innerHTML).toBe('Basic Item List 2');
  });

  it('should render an empty list', () => {
    render(<List />);

    expect(document.querySelector('ul').querySelector('div')).toBeEmptyDOMElement();
  });

  it('Should render a list with background color', () => {
    render(
      <List backgroundColor="orange">
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const ul = document.querySelector('ul');
    expect(ul).toHaveStyle(`
      background: orange;
    `);
  });

  it('Should render a list with custom style', () => {
    render(
      <List style={{ width: '80%' }}>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const ul = document.querySelector('ul');
    expect(ul).toHaveStyle(`
      width: 80%;
    `);
  });

  it('should render a list with subtitle', () => {
    render(
      <List>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const subtitle = document.querySelector('span');
    expect(subtitle).toHaveStyle(`
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      color: rgba(0, 0, 0, 0.54);
    `);
    expect(subtitle.innerHTML).toBe('Do you Know Lorem Ipsum?');
  });

  it('should render a collapsible list', () => {
    render(
      <List>
        <CollapsibleList header="Hello World">
          <List elevation={0}>
            <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
            <ListItem>Basic Item List 2</ListItem>
          </List>
        </CollapsibleList>
        <ListItem>Basic Item List 2</ListItem>
      </List>,
    );

    const CollapsibleElement = document.querySelector('ul').querySelector('div');

    expect(CollapsibleElement.querySelector('li')).toHaveStyle(`
      cursor: pointer;
    `);

    expect(CollapsibleElement.querySelectorAll('div')[1].innerHTML).toBe('Hello World');
    expect(CollapsibleElement.querySelector('svg').innerHTML).toContain('M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z');

    expect(CollapsibleElement.children[1]).toHaveStyle(`
      max-height: 0;
    `);

    act(() => {
      fireEvent.click(CollapsibleElement.querySelectorAll('div')[2]);
    });

    expect(CollapsibleElement.children[1]).toHaveStyle(`
      max-height: 100vh;
      overflow-y: hidden;
      transition: all .3s linear;
    `);

    expect(CollapsibleElement.querySelector('.padding-12-16-12-38')).toBeDefined();

    // expect(CollapsibleElement.querySelectorAll('div')[6].innerHTML).toBe('Basic Item List');
    // expect(CollapsibleElement.querySelectorAll('span')[1].innerHTML).toBe('Do you Know Lorem Ipsum?');

    act(() => {
      fireEvent.click(CollapsibleElement.querySelectorAll('div')[2]);
    });
    expect(CollapsibleElement.children[1]).toHaveStyle(`
      max-height: 0;
    `);
  });

  it('should render a densed list', () => {
    render(
      <List densed>
        <ListItem avatar={<MdAcUnit />} subtitle="Hello">
          Basic Item List 1
        </ListItem>
        <ListItem>Basic Item List 2</ListItem>
      </List>,
    );

    const ul = document.querySelector('ul');
    expect(ul).toHaveStyle(`
      padding: 4px 0;
    `);

    expect(ul.querySelectorAll('div')[0]).toHaveStyle(`
      padding: 6px 8px 6px 9px;
    `);
    expect(ul.querySelectorAll('div')[1]).toHaveStyle(`
      padding: 6px 8px 6px 9px;
    `);
  });

  it('Should render a densed collapsible list', () => {
    render(
      <List densed>
        <CollapsibleList header={'Hello World'}>
          <List densed elevation={0}>
            <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
            <ListItem>Basic Item List 2</ListItem>
          </List>
        </CollapsibleList>
      </List>,
    );

    const CollapsibleElement = document.querySelector('ul').querySelector('div');
    expect(CollapsibleElement.querySelector('.padding-6-8-6-28')).toBeDefined();
  });

  it('should render a Collapsible list with onChange', () => {
    const fn = jest.fn();

    render(
      <List>
        <CollapsibleList onChange={fn} header={'Hello World'}>
          <List elevation={0}>
            <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
          </List>
        </CollapsibleList>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const CollapsibleElement = document.querySelector('ul').querySelector('div');

    act(() => {
      fireEvent.click(CollapsibleElement.querySelectorAll('div')[2]);
    });

    expect(fn).toBeCalledTimes(1);
  });

  // For 100% coverage
  it('Should render an open collapsible list', () => {
    render(
      <List>
        <CollapsibleList open={true} header={'Hello World'}>
          <List elevation={0}>
            <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
          </List>
        </CollapsibleList>
      </List>,
    );

    const CollapsibleElement = document.querySelector('ul').querySelector('div');
    expect(CollapsibleElement.children[1]).toHaveStyle(`
      max-height: 100vh;
      overflow-y: hidden;
      transition: all .3s linear;
    `);
  });

  it('Should render a single densed collapsible list', () => {
    render(
      <List densed>
        <CollapsibleList header={'Hello World'}>
          <List densed elevation={0}>
            <ListItem>Basic Item List 2</ListItem>
          </List>
        </CollapsibleList>
      </List>,
    );

    const CollapsibleElement = document.querySelector('ul').querySelector('div');
    expect(CollapsibleElement.querySelectorAll('.padding-6-8-6-28')).toBeDefined();
  });
});

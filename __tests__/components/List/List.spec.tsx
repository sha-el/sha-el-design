import React from 'react';
import { CollapsibleList, List, ListItem } from '../../../src';
import { MdAcUnit } from 'react-icons/md';

import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';

describe('List', () => {
  it('should render a basic list', () => {
    render(
      <List>
        <ListItem avatar={<MdAcUnit />}>Basic Item List 1</ListItem>
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
    `);

    const listItem = ul.querySelector('li');
    expect(listItem).toHaveStyle(`
      display: block;
      background: #ffffff;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      cursor: pointer;
      list-style: none;
      overflow: hidden;
    `);

    expect(listItem.querySelectorAll('div')[1]).toHaveStyle(`
      padding: 12px 16px 12px 18px;
    `);
    expect(listItem.querySelectorAll('div')[2]).toHaveStyle(`
      padding: 12px 16px 12px 18px;
    `);

    expect(listItem.querySelector('svg').innerHTML).toContain(
      // Path for cross svg.
      'M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z',
    );
    const listItemText = listItem.querySelectorAll('div')[3];
    expect(listItemText.innerHTML).toBe('Basic Item List 1');
  });

  it('should render an empty list', () => {
    render(<List />);

    expect(document.querySelector('ul').querySelector('div')).toBeEmptyDOMElement();
  });

  it('should render a list with subtitle', () => {
    render(
      <List>
        <ListItem avatar={<MdAcUnit />} subtitle="Some Subtitle">
          Basic Item List
        </ListItem>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].querySelector('span')).toHaveStyle(`
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      color: rgba(0, 0, 0, 0.54);
    `);

    expect(listItems[0].querySelector('span').innerHTML).toBe('Some Subtitle');
    expect(listItems[1].querySelector('span').innerHTML).toBe('Do you Know Lorem Ipsum?');
  });

  it('should render a collapsible list', () => {
    render(
      <List>
        <CollapsibleList header={'Hello World'}>
          <List elevation={0}>
            <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
          </List>
        </CollapsibleList>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const CollapsibleElement = document.querySelector('ul').querySelector('div');

    expect(CollapsibleElement.querySelectorAll('div')[2].innerHTML).toBe('Hello World');
    expect(CollapsibleElement.querySelector('svg').innerHTML).toContain('M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z');

    expect(CollapsibleElement.querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 0;
    `);

    act(() => {
      fireEvent.click(CollapsibleElement.querySelectorAll('div')[3]);
    });

    expect(CollapsibleElement.querySelectorAll('div')[4]).toHaveStyle(`
      max-height: 100vh;
      padding-left: 20px;
      overflow-y: hidden;
    `);

    expect(CollapsibleElement.querySelectorAll('div')[8].innerHTML).toBe('Basic Item List');
    expect(CollapsibleElement.querySelectorAll('span')[1].innerHTML).toBe('Do you Know Lorem Ipsum?');
  });

  it('should render a desnsed list', () => {
    render(
      <List densed>
        <ListItem avatar={<MdAcUnit />}>Basic Item List 1</ListItem>
        <ListItem>Basic Item List 2</ListItem>
      </List>,
    );

    const ul = document.querySelector('ul');
    expect(ul).toHaveStyle(`
      padding: 4px 0;
    `);

    expect(ul.querySelectorAll('div')[1]).toHaveStyle(`
      padding: 6px 8px 6px 9px;
    `);
    expect(ul.querySelectorAll('div')[2]).toHaveStyle(`
      padding: 6px 8px 6px 9px;
    `);
  });

  it('should render an inline list', () => {
    render(
      <List inline>
        <ListItem avatar={<MdAcUnit />} subtitle="Do you Know Lorem Ipsum?">
          Basic Item List
        </ListItem>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>,
    );

    const li = document.querySelector('li');
    expect(li).toHaveStyle(`
      display: inline-block;
    `);
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
      fireEvent.click(CollapsibleElement.querySelectorAll('div')[3]);
    });

    expect(fn).toBeCalledTimes(1);
  });

  it('should render a list with custom gutter', () => {
    render(
      <List>
        <ListItem gutter={[0, '7px 9px 7px 10px']} avatar={<MdAcUnit />} subtitle="Do you Know Lorem Ipsum?">
          Basic Item List
        </ListItem>
      </List>,
    );

    const listItem = document.querySelector('li');
    expect(listItem.querySelectorAll('div')[1]).toHaveStyle(`
      padding: 7px 9px 7px 10px;
    `);
  });
});

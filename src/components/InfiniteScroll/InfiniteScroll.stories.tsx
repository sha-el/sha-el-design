import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Infinite Scroll', module);

import { InfiniteScroll } from './index';

const getData = (pageNumber: number): Promise<string[]> => {
  const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(list.slice((pageNumber - 1) * 3, (pageNumber * 3))),
      2000,
    );
  });
};

stories.add(
  'With height set for parent element',
  withInfo()(() => {
    return (
      <InfiniteScroll
        count={10}
        data={getData}
        render={(data) => (
          data.map((v) => <div style={{ height: '40vh', fontSize: '60px', textAlign: 'center' }} key={v}>{v}</div>)
        )}
        height='50vh'
      />
    );
  }),
);

stories.add(
  'Body scroll',
  withInfo()(() => (
    <InfiniteScroll
      count={10}
      data={getData}
      render={(data) => (
        data.map((v) => <div style={{ height: '40vh', fontSize: '60px', textAlign: 'center' }} key={v}>{v}</div>)
      )}
    />
  )),
);
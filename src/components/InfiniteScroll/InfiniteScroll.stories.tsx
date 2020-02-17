import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Infinite Scroll', module);

import { InfiniteScroll } from './index';

const getData = (): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(
      () => resolve([Math.random(), Math.random(), Math.random()]),
      2000,
    );
  });
};

stories.add(
  'With height set for parent element',
  withInfo()(() => {
    return (
      <InfiniteScroll
        data={getData}
        render={(data) => (
          data.map((v) => <div style={{ height: '40vh' }} key={v}>{v}</div>)
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
      data={getData}
      render={(data) => (
        data.map((v) => <div style={{ height: '40vh' }} key={v}>{v}</div>)
      )}
    />
  )),
);
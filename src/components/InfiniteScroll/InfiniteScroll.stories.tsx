import React from 'react';
import { Story, Meta } from '@storybook/react';

import { InfiniteScroll } from './index';
import { InfiniteScrollProps } from './InfiniteScroll';
import { Loading } from '../Loading';

export default {
  title: 'Display/InfiniteScroll',
  component: InfiniteScroll,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const getData = (pageNumber: number): Promise<string[]> => {
  const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return new Promise((resolve) => {
    setTimeout(() => resolve(list.slice((pageNumber - 1) * 3, pageNumber * 3)), 2000);
  });
};

export const Basic: Story<InfiniteScrollProps<string>> = (args) => (
  <InfiniteScroll
    {...args}
    loading={<Loading isLoading={true} />}
    count={10}
    data={getData}
    render={(data) =>
      data.map((v) => (
        <div style={{ height: '40vh', fontSize: '60px', textAlign: 'center' }} key={v}>
          {v}
        </div>
      ))
    }
  />
);

Basic.args = {
  height: '100vh',
};

export const Height = Basic.bind({});
Height.args = {
  height: '50vh',
};

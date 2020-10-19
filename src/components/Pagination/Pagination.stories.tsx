import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<PaginationProps> = (args) => {
  const [pageNumber, updatePageNumber] = React.useState(4);
  const [pageSize, updatePageSize] = React.useState(10);
  return (
    <Pagination
      {...args}
      batchSize={pageSize}
      currentPage={pageNumber}
      onChange={(np, pg) => {
        updatePageNumber(np);
        updatePageSize(pg);
      }}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  totalCount: 100,
  batchSize: 10,
};

export const ItemsPerPage = Template.bind({});
ItemsPerPage.args = {
  ...Basic.args,
  itemsPerPage: [10, 20, 30],
};

export const Justify = Template.bind({});
Justify.args = {
  ...ItemsPerPage.args,
  justify: 'flex-end',
};

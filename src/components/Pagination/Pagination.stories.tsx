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
  return <Pagination {...args} currentPage={pageNumber} onChange={(np) => updatePageNumber(np)} />;
};

export const Basic = Template.bind({});
Basic.args = {
  totalCount: 100,
  batchSize: 10,
};

export const CursorBasedPagination = Template.bind({});
CursorBasedPagination.args = {
  totalCount: Infinity,
  batchSize: 10,
  cursorBasedPagination: true,
};

export const HidePageNumbers = Template.bind({});
HidePageNumbers.args = {
  totalCount: 100,
  batchSize: 10,
  hideCurrentPageNumber: true,
  hidePageNumberList: true,
};

export const ShowTotal = Template.bind({});
ShowTotal.args = {
  totalCount: 100,
  batchSize: 10,
  showTotal: true,
};

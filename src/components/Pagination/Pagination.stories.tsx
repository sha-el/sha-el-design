import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Pagination } from './Pagination';

const stories = storiesOf('Pagination', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => {
    const [pageNumber, updatePageNumber] = React.useState(4);
    return (
      <Pagination
        totalCount={100}
        currentPage={pageNumber}
        batchSize={10}
        onChange={(np) => updatePageNumber(np)}
      />
    );
  }),
);

stories.add(
  'Cursor based Pagination',
  withInfo({ inline: true })(() => {
    const [pageNumber, updatePageNumber] = React.useState(4);
    return (
      <Pagination
        totalCount={Infinity}
        currentPage={pageNumber}
        batchSize={10}
        cursorBasedPagination
        onChange={(np) => updatePageNumber(np)}
      />
    );
  }),
);

stories.add(
  'Hide page numbers',
  withInfo({ inline: true })(() => {
    const [pageNumber, updatePageNumber] = React.useState(4);
    return (
      <Pagination
        totalCount={100}
        batchSize={10}
        hideCurrentPageNumber
        hidePageNumberList
        currentPage={pageNumber}
        onChange={(np) => updatePageNumber(np)}
      />
    );
  }),
);

stories.add(
  'Show total',
  withInfo({ inline: true })(() => {
    const [pageNumber, updatePageNumber] = React.useState(4);
    return (
      <Pagination
        totalCount={100}
        batchSize={10}
        showTotal
        currentPage={pageNumber}
        onChange={(np) => updatePageNumber(np)}
      />
    );
  }),
);
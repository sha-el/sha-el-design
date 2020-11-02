import * as React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdExpandMore } from 'react-icons/md';
import { Row, Col, Text, MenuItem, MenuItemGroup } from '../..';
import { Button } from '../Button';
import { RowProps } from '../Grid/Row';
import { Input } from '../Input';

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalCount, batchSize, currentPage, onChange, itemsPerPage, justify } = props;
  return (
    <Row alignItems="center" justifyContent={justify} gutter={[0, '10px']}>
      {itemsPerPage && (
        <Col flex="0 1 auto">
          <MenuItemGroup
            anchor={
              <Input
                style={{ width: '50px' }}
                after={<MdExpandMore />}
                label="Items/Page"
                value={batchSize}
                borderLess
              />
            }
            inline={false}
            position="bottom"
            title="Options"
          >
            {itemsPerPage.map((v) => (
              <MenuItem onClick={() => onChange(1, v, false, false)} key={`pagination-${v}`} name={`pagination-${v}`}>
                {v}
              </MenuItem>
            ))}
          </MenuItemGroup>
        </Col>
      )}
      <Col flex="0 1 auto">
        <Text color="light">
          {batchSize * (currentPage - 1) + 1} -{' '}
          {batchSize * currentPage > totalCount ? totalCount : batchSize * currentPage} of {totalCount}
        </Text>
      </Col>
      <Col flex="0 1 auto">
        <Button
          onClick={() => onChange(currentPage - 1, batchSize, false, true)}
          disabled={currentPage === 1}
          flat
          icon={<IoIosArrowBack />}
        />
      </Col>
      <Col flex="0 1 auto">{currentPage}</Col>
      <Col flex="0 1 auto">
        <Button
          onClick={() => onChange(currentPage + 1, batchSize, true, false)}
          disabled={currentPage === Math.ceil(totalCount / batchSize)}
          flat
          icon={<IoIosArrowForward />}
        />
      </Col>
    </Row>
  );
};

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  batchSize: number;
  itemsPerPage?: number[];
  onChange?: (newPage: number, pageSize: number, next: boolean, prev: boolean) => void;
  justify?: RowProps['justifyContent'];
}

import * as React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdExpandMore } from 'react-icons/md';
import { Row, Col, Text, MenuItem, Menu } from '../..';
import { Button } from '../Button';
import { RowProps } from '../Grid/Row';
import { Input } from '../Input';

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalCount, batchSize, currentPage, onChange, itemsPerPage, justify } = props;
  return (
    <Row alignItems="center" justifyContent={justify} gutter={[20, 0]} className="sha-el-pagination">
      {itemsPerPage && (
        <Col flex="0 1 auto">
          <Menu
            anchor={
              <Input
                style={{ width: '50px' }}
                after={<MdExpandMore />}
                label="Items/Page"
                value={batchSize}
                readOnly
                borderless
                containerStyle={{ margin: '7px 0' }}
              />
            }
            placement="bottom"
          >
            {itemsPerPage.map((v) => (
              <MenuItem onClick={() => onChange?.(1, v, false, false)} key={`pagination-${v}`}>
                {v}
              </MenuItem>
            ))}
          </Menu>
        </Col>
      )}
      <Col flex="0 1 auto">
        <Text color="light">
          {totalCount === 0 ? 0 : batchSize * (currentPage - 1) + 1} -{' '}
          {batchSize * currentPage > totalCount ? totalCount : batchSize * currentPage} of {totalCount}
        </Text>
      </Col>
      <Col flex="0 1 auto">
        <Button
          onClick={() => onChange?.(currentPage - 1, batchSize, false, true)}
          disabled={currentPage === 1}
          flat
          icon={<IoIosArrowBack />}
        />
      </Col>
      <Col flex="0 1 auto">{currentPage}</Col>
      <Col flex="0 1 auto">
        <Button
          onClick={() => onChange?.(currentPage + 1, batchSize, true, false)}
          disabled={currentPage === Math.ceil(totalCount / batchSize) || totalCount === 0}
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

import React from 'react';
import { GiEmptyMetalBucket } from 'react-icons/gi';
import { MdExpandMore } from 'react-icons/md';
import { Col, Row } from '../..';
import { classes } from '../../helpers';
import { disabledColor } from '../../helpers/color';
import { ColProps } from '../Grid/Col';
import { CollapsibleList, List, ListItem } from '../List';
import { ListProps } from '../List/List';
import { Skeleton } from '../Loading';
import { PaginationProps } from '../Pagination/Pagination';
import { useTheme } from '../Theme/Theme';
import { style as tableStyle } from './style';

export function Column<T>(props: ColumnProps<T>) {
  const { header: __header, data, children, className, index, ...rest } = props;
  return (
    <Col style={{ display: 'flex', alignItems: 'center' }} className={classes(className, 'table-cell')} {...rest}>
      {children(data, index)}
    </Col>
  );
}

export function FlexTable<T>(props: FlexTableProps<T>) {
  const { data, nested, responsive, style = {}, loading, pagination, onRowClick, rowStyle, ...rest } = props;

  const headers = Array.isArray(props.children)
    ? props.children.map((v) => React.cloneElement(v, { children: () => v.props.header as never, index: -1 }))
    : React.cloneElement(props.children, {
        children: () => (props.children as React.ReactElement<ColumnProps<T>>).props.header,
        index: -1,
      });

  const showEmptyState = (className: string) => {
    if (!props.data.length) {
      return (
        <div className={className}>
          <div>
            <GiEmptyMetalBucket style={{ margin: '20px auto', fontSize: '100px' }} />
          </div>
          <div>No Data</div>
        </div>
      );
    }
  };

  const theme = useTheme();
  const css = tableStyle({ theme, nested: !!nested, clickableRow: !!onRowClick });
  return (
    <List
      {...rest}
      className={css.tableContainer}
      style={{
        minWidth: responsive && Array.isArray(props.children) ? `${props.children.length * 100}px` : '100px',
        ...(style.container || {}),
      }}
    >
      <ListItem
        className={css.header}
        style={style.header}
        gutter={[0, 0]}
        action={nested && <MdExpandMore style={{ color: disabledColor(theme) }} />}
      >
        <Row gutter={[0, '15px']} alignItems="stretch">
          {headers}
        </Row>
      </ListItem>
      <Skeleton
        isLoading={loading || false}
        render={() => (
          <>
            {showEmptyState(css.empty)}
            {data.map((v, index) => {
              const children = Array.isArray(props.children)
                ? props.children.map((el, elIndex) =>
                    React.cloneElement(el, { data: v as never, key: `col-${index}-${elIndex}`, index }),
                  )
                : React.cloneElement(props.children, { data: v, key: `col-${index}`, index });

              if (nested && nested.exapandable?.(v, index)) {
                return (
                  <CollapsibleList
                    header={
                      <Row gutter={[0, '15px']} alignItems="stretch">
                        {children}
                      </Row>
                    }
                    key={`row-${index}`}
                    className={css.tableRow}
                    gutter={[0, 0]}
                    style={rowStyle && rowStyle(v, index)}
                  >
                    <div className={css.nestedContent}>{nested.render(v, index)}</div>
                  </CollapsibleList>
                );
              }

              return (
                <ListItem
                  action={props.nested && <MdExpandMore style={{ color: disabledColor(theme) }} />}
                  key={`row-${index}`}
                  className={css.tableRow}
                  gutter={[0, 0]}
                  onClick={() => onRowClick && onRowClick(v, index)}
                  style={rowStyle && rowStyle(v, index)}
                >
                  <Row gutter={[0, '15px']} alignItems="stretch">
                    {children}
                  </Row>
                </ListItem>
              );
            })}
          </>
        )}
      />
      {pagination || <div />}
    </List>
  );
}

FlexTable.Column = Column;

interface FlexTableProps<T> extends Omit<ListProps, 'style'> {
  data: T[];
  children: React.ReactElement<ColumnProps<T>> | React.ReactElement<ColumnProps<T>>[];
  nested?: {
    render: (data: T, index: number) => React.ReactNode;
    exapandable?: (data: T, index: number) => boolean;
  };
  responsive?: boolean;
  style?: {
    header?: React.CSSProperties;
    container?: React.CSSProperties;
  };
  pagination?: React.ReactElement<PaginationProps>;
  loading?: boolean;
  onRowClick?: (data: T, index: number) => void;
  rowStyle?: (data: T, index: number) => React.CSSProperties;
}

interface ColumnProps<T> extends ColProps {
  data?: T;
  index?: number;
  /**
   * Index will have -1 for header
   */
  children: (data?: T, index?: number) => React.ReactNode;
  header?: React.ReactNode;
  key: string;
}

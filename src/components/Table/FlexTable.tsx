import React from 'react';
import { GiEmptyMetalBucket } from 'react-icons/gi';
import { MdExpandMore } from 'react-icons/md';
import { classes } from 'typestyle';
import { Col, Row } from '../..';
import { disabledColor } from '../../helpers/color';
import { ColProps } from '../Grid/Col';
import { CollapsibleList, List, ListItem } from '../List';
import { ListProps } from '../List/List';
import { Skeleton } from '../Loading';
import { PaginationProps } from '../Pagination/Pagination';
import { ThemeConsumer } from '../Theme/Theme';
import { style as tableStyle } from './style';

export function Column<T>(props: ColumnProps<T>) {
  const { header: __header, data, children, className, ...rest } = props;
  return (
    <Col style={{ display: 'flex', alignItems: 'center' }} className={classes(className, 'table-cell')} {...rest}>
      {children(data)}
    </Col>
  );
}

export function FlexTable<T>(props: FlexTableProps<T>) {
  const { data, nested, responsive, style = {}, loading, pagination, ...rest } = props;

  const headers = Array.isArray(props.children)
    ? props.children.map((v) => React.cloneElement(v, { children: () => v.props.header as never }))
    : React.cloneElement(props.children, {
        children: () => (props.children as React.ReactElement<ColumnProps<T>>).props.header,
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

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = tableStyle(theme, !!nested);
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
              selected
              action={nested && <MdExpandMore style={{ color: disabledColor(theme) }} />}
            >
              <Row gutter={[0, '15px']} alignItems="stretch">
                {headers}
              </Row>
            </ListItem>
            <Skeleton
              isLoading={loading}
              render={() => (
                <>
                  {showEmptyState(css.empty)}
                  {data.map((v, index) => {
                    const children = Array.isArray(props.children)
                      ? props.children.map((el, elIndex) =>
                          React.cloneElement(el, { data: v as never, key: `col-${index}-${elIndex}` }),
                        )
                      : React.cloneElement(props.children, { data: v, key: `col-${index}` });

                    if (nested && nested.exapandable(v)) {
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
                        >
                          <div className={css.nestedContent}>{nested.render(v)}</div>
                        </CollapsibleList>
                      );
                    }

                    return (
                      <ListItem
                        action={props.nested && <MdExpandMore style={{ color: disabledColor(theme) }} />}
                        key={`row-${index}`}
                        className={css.tableRow}
                        gutter={[0, 0]}
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
            {pagination}
          </List>
        );
      }}
    </ThemeConsumer>
  );
}

FlexTable.Column = Column;

interface FlexTableProps<T> extends Omit<ListProps, 'style'> {
  data: T[];
  children: React.ReactElement<ColumnProps<T>> | React.ReactElement<ColumnProps<T>>[];
  nested?: {
    render: (data: T) => React.ReactNode;
    exapandable?: (data: T) => boolean;
  };
  responsive?: boolean;
  style?: {
    header?: React.CSSProperties;
    container?: React.CSSProperties;
  };
  pagination?: React.ReactElement<PaginationProps>;
  loading?: boolean;
}

interface ColumnProps<T> extends ColProps {
  data?: T;
  children: (data: T) => React.ReactNode;
  header?: React.ReactNode;
  key: string;
}

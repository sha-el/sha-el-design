import * as React from 'react';
import { GiEmptyMetalBucket } from 'react-icons/gi';
import { Theme, useTheme } from '../Theme/Theme';
import { lightText, borderColor } from '../../helpers/color';
import { Text } from '../Text';
import { classes } from '../../helpers';
import { css } from '@emotion/css';

/**
 * @deprecated Will be removed in 1.0.0
 */

export function Table<T>(props: TableProps<T>) {
  console.warn('This table component has been deprecated in favor of FlexTable. Please make the change.');

  const renderRow = () => {
    return props.data.map((v, index) => (
      <tr key={`table-row-${index}`}>
        {props.columns.map((f) => {
          return (
            <td key={`table-column-${f.key}-${index}`}>
              {f.render ? f.render(v[f.dataIndex], v, index) : v[f.dataIndex]}
              {f.children ? f.children(v[f.dataIndex], v, index) : ''}
            </td>
          );
        })}
      </tr>
    ));
  };

  const showEmptyState = (css: Record<'empty' | 'icon', string>) => {
    if (!props.data.length) {
      return (
        <div className={css.empty}>
          <div className={css.icon}>
            <GiEmptyMetalBucket style={{ margin: 'auto' }} />
          </div>
          <div>No Data</div>
        </div>
      );
    }
  };

  const { header, columns, footer } = props;
  const theme = useTheme();
  const css = style(theme);
  return (
    <div className={classes(css.container, css[`elevation${props.elevation}`])}>
      {header && (
        <Text variant="h6" className={css.header}>
          {header}
        </Text>
      )}
      <table className={css.table}>
        <thead>
          <tr>
            {columns.map((v) => (
              <th key={`table-header-${v.key}`}>{v.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
      {showEmptyState(css)}
      {footer && <div className={css.footer}>{footer}</div>}
    </div>
  );
}

Table.defaultProps = {
  shadow: true,
  elevation: 0,
};

const style = (theme: Theme) => ({
  table: css({
    width: '100%',
    borderCollapse: 'collapse',
    background: theme.background,
    fontSize: '14px',
    '& thead': {
      fontSize: '12px',
      fontWeight: 'bolder',
      color: theme.textColor,
    },
    '& tr': {
      borderBottom: `1px solid ${borderColor(theme.background)}`,
    },
    '& th': {
      padding: '15px 5px',
      textAlign: 'left',
      textTransform: 'capitalize',
      '&:first-of-type': {
        paddingLeft: '24px',
      },
      '&:last-of-type': {
        paddingRight: '24px',
      },
    },
    '& td': {
      textAlign: 'left',
      fontFamily: "'Fira Code', monospace !important",
      height: '50px',
      padding: '5px 0',
      fontWeight: 400,
      '&:first-of-type': {
        paddingLeft: '24px',
      },
      '&:last-of-type': {
        paddingRight: '24px',
      },
    },
  }),
  container: css({
    background: theme.background,
  }),
  icon: css({
    textAlign: 'center',
    fontSize: '50px',
    padding: '10px',
  }),
  empty: css({
    color: lightText(theme),
    background: theme.background,
    textAlign: 'center',
    padding: '50px',
  }),
  header: css({
    padding: '12px 24px 8px',
    lineHeight: '50px',
  }),
  footer: css({
    padding: '12px 24px 8px',
  }),
});

export interface TableProps<T> {
  data: T[];
  columns: Colums<T>[];
  elevation?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface Colums<T> {
  key: string;
  dataIndex?: keyof T;
  header?: React.ReactNode;
  render?: (text: T[keyof T], obj: T, index: number) => React.ReactNode;
  children?: (text: T[keyof T], obj: T, index: number) => React.ReactNode;
}

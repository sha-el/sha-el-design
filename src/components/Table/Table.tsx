import * as React from 'react';
import { stylesheet } from 'typestyle';
import { GiEmptyMetalBucket } from 'react-icons/gi';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { lightText, borderColor } from '../../helpers/color';
import { shadow } from '../../helpers/style';

export class Table<T> extends React.Component<TableProps<T>, {}> {

  static defaultProps = {
    shadow: true,
  };

  renderRow = () => {
    return (
      this.props.data.map((v, index) => (
        <tr key={`table-row-${index}`}>
          {this.props.columns.map(f => {
            return (
              <td key={`table-column-${f.key}-${index}`}>
                {f.render ? f.render(v[f.dataIndex], v, index) : v[f.dataIndex]}
                {f.children ? f.children(v[f.dataIndex], v, index) : ''}
              </td>
            );
          })}
        </tr>))
    );
  }

  showEmptyState = (css: Record<'empty' | 'icon', string>) => {
    if (!this.props.data.length) {
      return (
        <div className={css.empty}>
          <div className={css.icon}>
            <GiEmptyMetalBucket />
          </div>
          <div>
            No Data
          </div>
        </div>
      );
    }
  }

  render() {
    const { header, columns, footer, shadow: shadowEnabled } = this.props;
    return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(shadowEnabled, theme);
          return (
            <div className={css.container}>
              {header && <div className={css.header}>
                {header}
              </div>}
              <table className={css.table}>
                <thead>
                  <tr>
                    {columns.map(v => <th key={`table-header-${v.key}`}>{v.header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {this.renderRow()}
                </tbody>
              </table>
              {this.showEmptyState(css)}
              {footer && <div className={css.footer}>
                {footer}
              </div>}
            </div>
          );
        }}
      </ThemeConsumer>
    );
  }
}

const style = (shadowEnabled: boolean, theme: Theme) => {
  const shadow2x = shadow('2X', theme);
  return stylesheet({
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: theme.background,
      fontSize: '14px',
      $nest: {
        thead: {
          fontSize: '12px',
          fontWeight: 'bolder',
          color: theme.textColor,
        },
        tr: {
          borderBottom: `1px solid ${borderColor(theme.background)}`,
        },
        th: {
          padding: '15px 5px',
          textAlign: 'left',
          fontFamily: 'Roboto,"Helvetica Neue",sans-serif !important',
          textTransform: 'capitalize',
          $nest: {
            '&:first-of-type': {
              paddingLeft: '24px',
            },
            '&:last-of-type': {
              paddingRight: '24px',
            },
          },
        },
        td: {
          textAlign: 'left',
          fontFamily: '\'Fira Code\', monospace !important',
          height: '50px',
          padding: '5px 0',
          fontWeight: 400,
          $nest: {
            '&:first-of-type': {
              paddingLeft: '24px',
            },
            '&:last-of-type': {
              paddingRight: '24px',
            },
          },
        },
      },
    },
    container: {
      boxShadow: shadowEnabled && shadow2x,
      background: theme.background,
    },
    icon: {
      textAlign: 'center',
      fontSize: '50px',
      padding: '10px',
    },
    empty: {
      color: lightText(theme),
      background: theme.background,
      textAlign: 'center',
      padding: '50px',
    },
    header: {
      padding: '12px 24px 8px',
      lineHeight: '50px',
      fontSize: '1.142rem',
      color: lightText(theme),
    },
    footer: {
      padding: '12px 24px 8px',
    },
  });
};

interface TableProps<T> {
  data: T[];
  columns: Colums<T>[];
  shadow?: boolean;
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

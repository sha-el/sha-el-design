import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { PoseGroup } from 'react-pose';
import { FaMeh } from 'react-icons/fa';

export class Table<T> extends React.Component<TableProps<T>, {}> {
  constructor(props: TableProps<T>) {
    super(props);
  }

  static defaultProps = {
    shadow: true,
  };

  renderRow() {
    return (
      this.props.data.map((v, index) => (
        <tr key={`table-row-${index}`}>
          {this.props.columns.map(f => {
            return (
              <td key={`table-column-${f.key}-${index}`}>
                {f.render ? f.render(v[f.dataIndex], v) : v[f.dataIndex]}
                {f.children ? f.children(v[f.dataIndex], v) : ''}
              </td>
            );
          })}
        </tr>))
    );
  }

  showEmptyState = () => {
    const style = this.css();
    if (!this.props.data.length) {
      return (
        <div className={style.icon}>
          <FaMeh />
          <div>No Data</div>
        </div>
      );
    }
  }

  render() {
    const style = this.css();
    return (
      <div className={style.container}>
        <table className={style.table}>
          <thead>
            <tr>
              {this.props.columns.map(v => <th key={`table-header-${v.key}`}>{v.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.renderRow()}
          </tbody>
        </table>
        {this.showEmptyState()}
      </div>
    );
  }

  css = () => stylesheet({
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
      boxShadow: this.props.shadow && styleEnum.shadow_2x,
      fontSize: '14px',
      $nest: {
        thead: {
          fontSize: '12px',
          fontWeight: 'bolder',
          color: 'rgba(0,0,0,.54)',
        },
        tr: {
          borderBottom: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
        },
        th: {
          padding: '15px 5px',
          textAlign: 'left',
          fontFamily: 'Roboto,"Helvetica Neue",sans-serif !important',
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
          padding: '10px 5px',
          fontFamily: 'monospace !important',
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
      background: 'white',
      padding: this.props.shadow && '10px',
    },
    icon: {
      textAlign: 'center',
      fontSize: '100px',
      color: '#ccc',
      padding: '10px',
      width: '100%',
    },
  })
}

interface TableProps<T> {
  data: T[];
  columns: Colums<T>[];
  shadow?: boolean;
}

export interface Colums<T> {
  key: string;
  dataIndex?: keyof T;
  header?: React.ReactNode;
  render?: (text: T[keyof T], obj: T) => React.ReactNode;
  children?: (text: T[keyof T], obj: T) => React.ReactNode;
}

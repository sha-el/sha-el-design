import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { PoseGroup } from 'react-pose';

export class Table<T> extends React.Component<TableProps<T>, {}> {
  constructor(props: TableProps<T>) {
    super(props);
  }

  render() {
    const style = this.css();
    return (
      <table className={style.table}>
        <thead>
          <tr>
            {this.props.columns.map(v => <th key={`table-header-${v.key}`}>{v.header}</th>)}
          </tr>
        </thead>
        <tbody>
          <PoseGroup>
            {this.props.data.map((v, index) => <tr key={`table-row-${index}`}>
              {this.props.columns.map(f => {
                return (
                  <td key={`table-column-${f.key}-${index}`}>
                    {f.render ? f.render(v[f.dataIndex], v) : v[f.dataIndex]}
                    {f.children ? f.children(v[f.dataIndex], v) : ''}
                  </td>
                );
              })}
            </tr>)}
          </PoseGroup>
        </tbody>
      </table>
    );
  }

  css = () => stylesheet({
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
      $nest: {
        'thead': {
          boxShadow: styleEnum.shadow_bot_2x,
        },
        'tr': {
          borderBottom: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
        },
        'th, td': {
          textAlign: 'left',
          padding: '10px 5px',
          borderRight: `${styleEnum.borderWidth} ${styleEnum.borderStyle} ${styleEnum.borderColor}`,
        },
      },
    },
  })
}

interface TableProps<T> {
  data: T[];
  columns: Colums<T>[];
}

interface Colums<T> {
  key: string;
  dataIndex?: keyof T;
  header?: React.ReactNode;
  render?: (text: T[keyof T], obj: T) => React.ReactNode;
  children?: (text: T[keyof T], obj: T) => React.ReactNode;
}

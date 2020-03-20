import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { GiEmptyMetalBucket } from 'react-icons/gi';
import { Theme, ThemeService } from '../../helpers/theme';

export class Table<T> extends React.Component<TableProps<T>, State> {
  constructor(props: TableProps<T>) {
    super(props);

    this.state = {
      theme: this.themeService.selectedTheme$.value,
    };
  }

  themeService = new ThemeService();

  componentDidMount() {
    this.themeService.selectedTheme$.subscribe(theme => this.setState({ theme }));
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
                {f.render ? f.render(v[f.dataIndex], v, index) : v[f.dataIndex]}
                {f.children ? f.children(v[f.dataIndex], v, index) : ''}
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
        <div className={style.empty}>
          <div className={style.icon}>
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
    const style = this.css();
    const { header, columns, footer } = this.props;
    return (
      <div className={style.container}>
        {header && <div className={style.header}>
          {header}
        </div>}
        <table className={style.table}>
          <thead>
            <tr>
              {columns.map(v => <th key={`table-header-${v.key}`}>{v.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.renderRow()}
          </tbody>
        </table>
        {this.showEmptyState()}
        {footer}
      </div>
    );
  }

  css = () => stylesheet({
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
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
      padding: this.props.shadow && '10px 5px',
      boxShadow: this.props.shadow && styleEnum.shadow_2x,
      background: 'white',
    },
    icon: {
      textAlign: 'center',
      fontSize: '50px',
      padding: '10px',
    },
    empty: {
      color: '#ccc',
      background: 'white',
      textAlign: 'center',
      padding: '50px',
    },
    header: {
      padding: '15px 24px',
    },
  })
}

interface State {
  theme: Theme;
}

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

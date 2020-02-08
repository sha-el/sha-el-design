import * as React from 'react';
import { stylesheet } from 'typestyle';
import posed, { PoseGroup } from 'react-pose';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Theme, ThemeService } from '../../helpers/theme';
import { getColor } from '../../helpers';
import { styleEnum } from '../../helpers/constants';

const range = (start: number, end: number) => {
  const resp = [];
  let j = 0;
  for (let i = start; i <= end; i++) {
    resp.push(i);
    j++;
    if (j === 5) { break; }
  }
  return resp;
};

export class Pagination extends React.Component<PaginationProps, State> {
  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      theme: this.themeService.selectedTheme$.value,
    };
  }

  static defaultProps = {
    onChange: () => { },
  };

  componentDidMount() {
    this.themeService.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  createItems = () => {
    const { currentPage, cursorBasedPagination, batchSize, totalCount } = this.props;

    if (cursorBasedPagination) {
      return [currentPage];
    }

    if (currentPage < 3) {
      return range(1, Math.ceil(totalCount / batchSize));
    }

    return range(currentPage - 1, Math.ceil(totalCount / batchSize));
  }

  themeService = new ThemeService();

  render() {
    const css = this.css();
    const { currentPage, onChange, batchSize, totalCount, showTotal } = this.props;
    const { theme } = this.state;
    return (
      <>
        <div
          style={this.props.style}
          className={css.container}
        >
          <li
            className={`${css.list} ${css.bigFont}`}
            onClick={() => currentPage > 1 && onChange(currentPage - 1, batchSize, false, true)}
          >
            <IoIosArrowBack />
          </li>
          <PoseGroup>
            {this.createItems().map(v =>
              <List
                key={v}
                posekey={currentPage}
                className={css.list}
                pose={v === currentPage ? 'active' : 'inActive'}
                background={v === currentPage ? theme.primary : theme.default}
                color={v === currentPage && getColor(theme.primary)}
                onClick={() => onChange(v, 20, false, false)}
              >
                {v}
              </List>,
            )}
          </PoseGroup>
          <li
            className={`${css.list} ${css.bigFont}`}
            onClick={() => currentPage !== totalCount && onChange(currentPage + 1, batchSize, true, false)}
          >
            <IoIosArrowForward />
          </li>
        </div>
        <div className={css.totalText}>
          {showTotal && `${(currentPage - 1) * batchSize}-${currentPage * batchSize} of ${totalCount}`}
        </div>
      </>
    );
  }

  css = () => stylesheet({
    container: {
      width: 'auto',
      overflow: 'hidden',
      display: 'inline-flex',
      boxShadow: styleEnum.shadow_bot,
      flex: 0,
      whiteSpace: 'nowrap',
      margin: '5px 0',
    },
    list: {
      display: 'inline-flex',
      padding: '5px 10px',
      alignContent: 'center',
      borderCollapse: 'collapse',
      cursor: 'pointer',
      margin: '0 1px',
    },
    bigFont: {
      fontSize: '16px',
    },
    totalText: {
      fontSize: '12px',
      color: '#aaa',
      padding: '0 10px',
    },
  })
}

const List = posed.li({
  active: {
    scale: 1,
    background: ({ background }) => background,
    color: ({ color }) => color,
  },

  inActive: {
    scale: 0.9,
    background: '#ffffff',
    color: '#000000',
  },
});

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  batchSize: number;
  hideCurrentPageNumber?: boolean;
  hidePageNumberList?: boolean;
  showTotal?: boolean;
  onChange?: (newPage: number, pageSize: number, next: boolean, prev: boolean) => void;
  style?: React.CSSProperties;
  cursorBasedPagination?: boolean;
}

interface State {
  theme: Theme;
}

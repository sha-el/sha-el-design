import * as React from 'react';
import { stylesheet } from 'typestyle';
import posed, { PoseGroup } from 'react-pose';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Theme, ThemeService } from '../../helpers/theme';
import { getColor } from '../../helpers';
import { styleEnum } from '../../helpers/constants';

export class Pagination extends React.Component<PaginationProps, State> {
  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      theme: this.themeService.selectedTheme$.value,
    };
  }

  componentDidMount() {
    this.themeService.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  createItems = () => {
    const { currentPage, cursorBasedPagination } = this.props;

    if (cursorBasedPagination) {
      return [currentPage];
    }

    if (currentPage < 3) {
      return [1, 2, 3, 4, 5];
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }

  themeService = new ThemeService();

  render() {
    const css = this.css();
    const { currentPage, onChange, batchSize, totalCount } = this.props;
    const { theme } = this.state;
    return (
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
              background={theme.primary}
              color={getColor(theme.primary)}
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

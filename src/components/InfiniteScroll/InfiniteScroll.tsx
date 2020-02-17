import * as React from 'react';
import { stylesheet } from 'typestyle';
import { Loading } from '../Loading';
import { debounce } from 'debounce';

export class InfiniteScroll<T> extends React.Component<InfiniteScrollProps<T>, State<T>, {}> {
  constructor(props: InfiniteScrollProps<T>) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  el: HTMLDivElement;

  static defaultProps = {
    scrollElement: document,
    loading: <Loading isLoading={true} />,
  };

  componentDidMount() {
    this.props.data().then(v => this.setState({ data: v, isLoading: false }));
    this.initScrollEvent();
  }

  scrollElement = () => {
    if (!this.props.height) {
      return document;
    }
    return this.el;
  }

  onScroll = (data: InfiniteScrollProps<T>['data']) => debounce(
    (event) => {
      if (this.isElementAtBottom(event.target as HTMLElement) && !this.state.isLoading) {
        this.setState({ isLoading: true });
        const d = [...this.state.data];
        data().then(
          (v) => this.setState({ data: d.concat(v), isLoading: false }),
        );
      }
    },
    200,
  )

  initScrollEvent = () => {
    const { data } = this.props;
    const scrollElement = this.scrollElement();
    scrollElement.onscroll = this.onScroll(data);
  }

  isElementAtBottom(
    target: any,
  ) {
    if (target === document) {
      return (
        Math.abs(window.innerHeight + window.pageYOffset - document.body.offsetHeight) <= (document.body.scrollHeight * 10) / 100
      );
    }
    return Math.abs(target.scrollTop - (target.scrollHeight - target.offsetHeight)) <= (target.scrollHeight * 10) / 100;
  }

  css = () => {
    const { height } = this.props;
    return stylesheet({
      container: {
        height: height || 'auto',
        overflow: height ? 'auto' : 'hidden',
        position: 'relative',
      },
      loadingIndicator: {
        marginBottom: '20px',
        position: 'relative',
        margin: 'auto',
        left: 0,
        right: 0,
      },
      loadingContainer: {
        position: 'relative',
      },
    });
  }

  render() {
    const { data, isLoading } = this.state;
    const { render, loading } = this.props;
    const css = this.css();
    return (
      <>
        <div
          className={css.container}
          ref={(el) => this.el = el}
        >
          {render(data)}
        </div>
        <div className={css.loadingContainer}>
          {isLoading && <div className={css.loadingIndicator} >{loading}</div>}
        </div>
      </>
    );
  }
}

interface InfiniteScrollProps<T> {
  /**
   * Function To render Content
   * @param data of type T
   * @returns React.ReactNode
   */
  render: (data: T[]) => React.ReactNode;
  /**
   * Function to fetch data
   * @returns Promise of type T
   */
  data: () => Promise<T[]>;
  /**
   * Defines height of container when you dont want whole body to scroll
   * @default auto
   */
  height?: React.CSSProperties['height'];
  /**
   * Loading to be shown while fetch is happening
   * @default <Loading />
   */
  loading?: React.ReactNode;
}

interface State<T> {
  data: T[];
  isLoading: boolean;
}
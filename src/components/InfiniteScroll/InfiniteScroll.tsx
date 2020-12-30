import * as React from 'react';
import { Loading } from '../Loading';
import { debounce } from 'debounce';
import { style } from './style';

export class InfiniteScroll<T> extends React.Component<InfiniteScrollProps<T>, State<T>, unknown> {
  constructor(props: InfiniteScrollProps<T>) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      pageNumber: 1,
    };
  }
  el: HTMLDivElement;

  static defaultProps = {
    scrollElement: document,
    loading: <Loading isLoading={true} />,
  };

  componentDidMount() {
    this.props.data(this.state.pageNumber).then((v) => this.setState({ data: v, isLoading: false }));
    this.initScrollEvent();
  }

  scrollElement = () => {
    if (!this.props.height) {
      return document;
    }
    return this.el;
  };

  onScroll = (data: InfiniteScrollProps<T>['data']) =>
    debounce((event) => {
      if (
        this.state.data.length >= this.props.count ||
        !this.isElementAtBottom(event.target as HTMLElement) ||
        this.state.isLoading
      ) {
        return;
      }
      this.setState({ isLoading: true });
      const d = [...this.state.data];
      data(this.state.pageNumber + 1).then((v) =>
        this.setState({ data: d.concat(v), isLoading: false, pageNumber: this.state.pageNumber + 1 }),
      );
    }, 200);

  initScrollEvent = () => {
    const { data } = this.props;
    const scrollElement = this.scrollElement();
    scrollElement.onscroll = this.onScroll(data);
  };

  isElementAtBottom(target: HTMLDocument | HTMLElement) {
    if (target === document) {
      return (
        Math.abs(window.innerHeight + window.pageYOffset - document.body.offsetHeight) <=
        (document.body.scrollHeight * 10) / 100
      );
    }
    return (
      Math.abs(
        (target as HTMLElement).scrollTop -
          ((target as HTMLElement).scrollHeight - (target as HTMLElement).offsetHeight),
      ) <=
      ((target as HTMLElement).scrollHeight * 10) / 100
    );
  }

  render() {
    const { data, isLoading, pageNumber } = this.state;
    return (
      <Container
        {...this.props}
        data={data}
        pageNumber={pageNumber}
        isLoading={isLoading}
        element={(el) => (this.el = el)}
      />
    );
  }
}

const Container: React.FC<ContainerProps> = (props) => {
  const { data, render, loading, isLoading, element, height } = props;
  const css = style({ height });
  return (
    <>
      <div className={css.container} ref={(el) => element(el)}>
        {render(data)}
      </div>
      <div className={css.loadingContainer}>{isLoading && <div className={css.loadingIndicator}>{loading}</div>}</div>
    </>
  );
};

export interface InfiniteScrollProps<T> {
  /**
   * Function To render Content
   * @param data of type T
   * @returns React.ReactNode
   */
  render: (data: T[]) => React.ReactNode;
  /**
   * Function to fetch data
   * @param pageNumber current page number
   * @returns Promise of type T
   */
  data: (pageNumber: number) => Promise<T[]>;
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
  /**
   * Total Count of data
   */
  count: number;
}

interface State<T> {
  data: T[];
  isLoading: boolean;
  pageNumber: number;
}

type ContainerProps = Omit<InfiniteScrollProps<unknown>, 'data'> &
  State<unknown> & { element: (el: HTMLDivElement) => void };

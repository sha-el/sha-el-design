import * as React from 'react';
import { stylesheet, keyframes } from 'typestyle';

import { LoadingProps } from './Loading';

export class Skeleton extends React.Component<LoadingProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading } = this.props;
    const css = style();

    if (isLoading) {
      return (
        <div>
          <div className={css.wrapper}>
            <div className={css.titleBlock}>
              <div className={`${css.loading} ${css.title}`} />
              <div className={`${css.loading} ${css.content}`} />
              <div className={`${css.loading} ${css.content} ${css.lastRow}`} />
            </div>
            <div className={css.titleBlock}>
              <div className={`${css.loading} ${css.title}`} />
              <div className={`${css.loading} ${css.content}`} />
              <div className={`${css.loading} ${css.content} ${css.lastRow}`} />
            </div>
            <div className={`${css.listBlock}`}>
              <div className={`${css.loading} ${css.content} ${css.lineItem}`} />
              <div className={`${css.loading} ${css.content} ${css.lineItemLast}`} />
            </div>
          </div>
        </div>
      );
    }
  }
}

function style() {

  const animation = keyframes({
    '0%': {
      backgroundPosition: '-468px 0',
    },
    '100%': {
      backgroundPosition: '468px 0',
    },
  });

  return stylesheet({
    wrapper: {
      width: '100%',
    },
    titleBlock: {
      paddingBottom: '24px',
      paddingTop: '8px',
    },
    loading: {
      background: '#f6f7f8',
      backgroundImage: '-webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
      backgroundRepeat: 'no-repeat',
      borderRadius: '2px',
      animationDuration: '1s',
      animationFillMode: 'forwards',
      animationIterationCount: 'infinite',
      animationName: animation,
      animationTimingFunction: 'linear',
    },
    title: {
      height: '20px',
      width: '25%',
      marginBottom: '28px',
    },
    content: {
      height: '20px',
      marginBottom: '12px',
    },
    lastRow: {
      width: '90%',
      marginBottom: '0px',
    },
    listBlock: {
      paddingTop: '12px',
    },
    lineItem: {
      marginBottom: '28px',
    },
    lineItemLast: {},
  });
}
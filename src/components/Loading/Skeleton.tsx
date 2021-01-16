import * as React from 'react';

import { LoadingProps } from './Loading';
import { Card, CardBody } from '../Card';
import { skeletonStyle as style } from './style';
import { useTheme } from '../Theme/Theme';

export const Skeleton: React.FunctionComponent<LoadingProps> = (props) => {
  const { isLoading, render = () => <div /> } = props;

  if (isLoading) {
    const theme = useTheme();

    return (
      <Card>
        <CardBody>
          <div className={style(theme).wrapper}>
            <div className="skeleton">
              <div className="skeleton-content">
                <div className="skeleton-header">
                  <div className="skeleton-line" style={{ width: '60%' }} />
                </div>
                <div className="skeleton-text">
                  <div className="skeleton-line" style={{ width: '90%' }} />
                  <div className="skeleton-line" style={{ width: '100%' }} />
                  <div className="skeleton-line" style={{ width: '35%' }} />
                </div>
                <div className="skeleton-header">
                  <div className="skeleton-line" style={{ width: '60%' }} />
                </div>
                <div className="skeleton-text">
                  <div className="skeleton-line" style={{ width: '90%' }} />
                  <div className="skeleton-line" style={{ width: '100%' }} />
                  <div className="skeleton-line" style={{ width: '35%' }} />
                </div>
                <div className="skeleton-header">
                  <div className="skeleton-line" style={{ width: '60%' }} />
                </div>
                <div className="skeleton-text">
                  <div className="skeleton-line" style={{ width: '90%' }} />
                  <div className="skeleton-line" style={{ width: '100%' }} />
                  <div className="skeleton-line" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return render && render();
};

import React from 'react';
import { Card } from '../Card';
import { skeletonStyle as style } from './style';
import { SurfaceProps } from '../../typings/surface';

export const Skeleton: React.FunctionComponent<SkeletonProps> = (props) => {
  const { isLoading, render = () => <div /> } = props;

  if (isLoading) {
    return (
      <Card elevation={props.elevation} border={props.border} padding={props.padding} margin={props.margin}>
        <div className={style()}>
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
      </Card>
    );
  }

  return render && render();
};

export interface SkeletonProps extends SurfaceProps {
  isLoading?: boolean;
  render?: () => React.ReactElement;
}

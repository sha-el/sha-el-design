import * as React from 'react';
import { stylesheet, keyframes } from 'typestyle';

import { LoadingProps } from './Loading';
import { Card, CardBody } from '../Card';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { colorShades } from '../../helpers/color';

export const Skeleton: React.FunctionComponent<LoadingProps> = (props) => {
  const { isLoading, render } = props;

  if (isLoading) {
    return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(theme);

          return (
            <Card>
              <CardBody>
                <div className={css.wrapper}>
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
        }}
      </ThemeConsumer>
    );
  }

  return render && render();
};

function style(theme: Theme) {
  const animation = keyframes({
    '0%': {
      opacity: 0.2,
      transform: 'translateY(6px) scale(0.98)',
    },
    '85%, 100%': {
      opacity: 1,
      transform: 'translateY(0px) scale(1)',
    },
  });

  const [col1, col2] = colorShades(theme.background);

  return stylesheet({
    wrapper: {
      padding: '0.8rem 0.75rem',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      border: `1px solid ${col2}`,
      overflow: 'hidden',

      $nest: {
        '.skeleton-header': {
          marginTop: '20px',
          transformOrigin: 'bottom',
          animation: `${animation} 1s ease-in-out forwards infinite`,
          animationDirection: 'alternate',
          backgroundColor: col1,
          $nest: {
            '.skeleton-line': {
              height: '1rem',
              marginBottom: '0.5rem',
            },
          },
        },
        '.skeleton-text': {
          animationDelay: '200ms',
          animation: `${animation} 1s ease-in-out forwards infinite`,
          animationDirection: 'alternate',
          $nest: {
            '.skeleton-line': {
              height: '0.7rem',
              backgroundColor: col1,
              borderRadius: '3px',
              marginBottom: '0.3rem',
            },
          },
        },
        skeleton: {
          background: col2,
        },
      },
    },
  });
}

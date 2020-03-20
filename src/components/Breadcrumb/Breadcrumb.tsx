import * as React from 'react';
import { style } from 'typestyle';

export const Breadcrumb: React.StatelessComponent<BreadcrumbProps> = (props) => {
  return (
    <div className={css()}>
      {props.paths.map((v, index) => {
        return ([
          <li key={`breadcrumb-item-${index}`}>{v()}</li>,
          index !== props.paths.length - 1
          && <span style={{ margin: '0 5px' }} className='breadcrumb-seperator' key={`breadcrumb-seperator-${index}`}>{props.seperator}</span>,
        ]);
      })}
    </div>
  );
};

Breadcrumb.defaultProps = {
  seperator: '>',
  paths: [],
};

const css = () => style({
  color: '#555',
  $nest: {
    '& li': {
      display: 'inline-block',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      $nest: {
        '& *': {
          color: '#555',
        },
        '&:last-child': {
          $nest: {
            '& *': {
              color: 'blue',
            },
          },
        },
      },
    },
  },
});

export interface BreadcrumbProps {
  seperator?: string;
  paths?: (() => React.ReactNode)[];
}
import * as React from 'react';
import { style } from 'typestyle';

export const Breadcrumb: React.StatelessComponent<BreadcrumbProps> = (props) => {
  return (
    <div className={css()}>
      {props.paths.map((v, index) => {
        return ([
          <li key={`breadcrumb-item-${index}`}>{v.render()}</li>,
          index !== props.paths.length - 1
          && <span style={{ margin: '0 5px' }} className='breadcrumb-seperator' key={`breadcrumb-seperator-${index}`}>{props.seperator}</span>,
        ]);
      })}
    </div>
  );
};

Breadcrumb.defaultProps = {
  seperator: '/',
};

const css = () => style({
  color: '#555',
  margin: '0 0 10px 0',
  $nest: {
    li: {
      display: 'inline-block',
    },
  },
});

export interface BreadcrumbProps {
  seperator?: string;
  paths: {
    render: () => React.ReactNode;
  }[];
}
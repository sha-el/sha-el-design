import * as React from 'react';
import { style } from 'typestyle';

export const Breadcrumb: React.StatelessComponent<Props> = (props) => {
  return (
    <div className={css()}>
      {props.paths.map((v, index) => {
        return ([
          <li key={`breadcrumb-item-${index}`}>{v.render()}</li>,
          index !== props.paths.length - 1 && <span key={`breadcrumb-seperator-${index}`}>{props.seperator}</span>,
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
  $nest: {
    li: {
      display: 'inline-block',
      padding: '0 5px',
    },
  },
});

interface Props {
  seperator?: string;
  paths: {
    render: () => React.ReactNode;
  }[];
}
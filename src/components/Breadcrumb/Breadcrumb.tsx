import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { style } from './style';
import { Row } from '../..';

export const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const theme = useTheme();
  const css = style(theme);

  const children: React.ReactElement[] = Array.isArray(props.children)
    ? (props.children as React.ReactElement[])
    : [props.children];

  return (
    <Row gutter={[0, 0]} className={css} alignItems="center">
      {children.map((v, index) => (
        <React.Fragment key={`breadcrumb-${index}`}>
          <li key={`bread-${index}`}>{v}</li>
          {index !== children.length - 1 && (
            <li className="breadcrumb-seperator" key={`breadcrumb-seperator-${index}`}>
              {props.seperator}
            </li>
          )}
        </React.Fragment>
      ))}
    </Row>
  );
};

Breadcrumb.defaultProps = {
  seperator: '/',
  children: [],
};

export interface BreadcrumbProps {
  seperator?: React.ReactNode;
  children?: React.ReactElement | React.ReactElement[];
}

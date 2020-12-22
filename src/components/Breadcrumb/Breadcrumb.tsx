import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { style as buttonStyles } from '../Button/style';
import { classes } from '../../helpers';
import { style } from './style';

export const Breadcrumb: React.StatelessComponent<BreadcrumbProps> = (props) => {
  const theme = useTheme();
  const css = style(theme);
  const buttonClasses = buttonStyles({ props: { type: 'link' }, theme });

  return (
    <div className={css.breadcrumbs}>
      {props.paths.map((v, index) => {
        return [
          <li className={classes(buttonClasses.default, buttonClasses.anchor)} key={`breadcrumb-item-${index}`}>
            {v()}
          </li>,
          index !== props.paths.length - 1 && (
            <li style={{ margin: '0 5px' }} className="breadcrumb-seperator" key={`breadcrumb-seperator-${index}`}>
              {props.seperator}
            </li>
          ),
        ];
      })}
    </div>
  );
};

Breadcrumb.defaultProps = {
  seperator: '>',
  paths: [],
};

export interface BreadcrumbProps {
  seperator?: React.ReactNode;
  paths?: (() => React.ReactNode)[];
}

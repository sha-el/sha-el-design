import * as React from 'react';
import { style, classes } from 'typestyle';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { colorShades } from '../../helpers/color';
import { style as buttonStyles } from '../Button/Button';

export const Breadcrumb: React.StatelessComponent<BreadcrumbProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <div className={css(theme)}>
          {props.paths.map((v, index) => {
            const buttonClasses = buttonStyles({ type: 'link' }, theme);
            return ([
              <li className={classes(buttonClasses.default, buttonClasses.anchor)} key={`breadcrumb-item-${index}`}>{v()}</li>,
              index !== props.paths.length - 1
              && <li
                style={{ margin: '0 5px' }}
                className='breadcrumb-seperator'
                key={`breadcrumb-seperator-${index}`}
              >
                {props.seperator}
              </li>,
            ]);
          })}
        </div>
      )}
    </ThemeConsumer>
  );
};

Breadcrumb.defaultProps = {
  seperator: '>',
  paths: [],
};

const css = (theme: Theme) => {
  const [, , primary3] = colorShades(theme.primary);
  return style({
    color: theme.textColor,
    $nest: {
      '& li': {
        display: 'inline-flex',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1px',
        $nest: {
          '& *': {
            color: theme.textColor,
          },
          '&:last-child': {
            $nest: {
              '& *': {
                color: primary3,
              },
            },
          },
        },
      },
    },
  });
};

export interface BreadcrumbProps {
  seperator?: React.ReactNode;
  paths?: (() => React.ReactNode)[];
}
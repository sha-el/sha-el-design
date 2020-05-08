import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { styleEnum } from './../../helpers/constants';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { shadow } from '../../helpers/style';
import { colorShades } from '../../helpers/color';

export const CheckBox: React.FunctionComponent<CheckBoxProps> = (props) => {
  const input = React.createRef<HTMLInputElement>();

  const onContainerClick = () => {
    if (input.current) {
      input.current.click();
    }
  };

  const { label, className, error } = props;
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme, props.block);

        return (
          <div className={css.container} onClick={() => onContainerClick()}>
            <input className={css.checkbox} ref={input} type='checkbox' {...props} />
            <label className={`${css.label}`}>{label}</label>
            {error &&
              <div style={{ marginTop: '0' }} key='error' className={classes(css.errorStyle, className)}>
                {error}
              </div>
            }
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (theme: Theme, block: boolean) => {
  const backgroundColor = theme.textColor;

  return stylesheet({
    container: {
      cursor: 'pointer',
      margin: '10px 0',
      fontWeight: 'lighter',
      boxShadow: block && shadow('BOT', theme),
      lineHeight: '22px',
    },
    label: {
      color: theme.textColor,
      transition: 'all .5s',
      pointerEvents: 'none',
      fontSize: '16px',
      marginLeft: '30px',
      position: 'relative',
      $nest: {
        '&::before': {
          cursor: 'pointer',
          content: '""',
          border: '1px solid ' + backgroundColor,
          position: 'absolute',
          left: '-23px',
          top: '0',
          width: '16px',
          height: '16px',
          zIndex: 0,
          transition: '.4s ease',
        },
        '&::after': {
          content: '""',
          cursor: 'pointer',
          position: 'absolute',
          left: '0',
          top: '0',
          margin: '4px',
          width: '16px',
          height: '16px',
          zIndex: 0,
          transition: '.28s ease',
        },
      },
    },
    errorStyle: {
      fontSize: '14px',
      padding: '0 7px',
      color: theme.error,
    },
    checkbox: {
      display: 'none',
      $nest: {
        '&:checked': {
          $nest: {
            '& ~ label:after': {
              content: '""',
              cursor: 'pointer',
              position: 'absolute',
              left: '-23px',
              top: '0',
              margin: '4px',
              width: '16px',
              height: '16px',
              zIndex: 0,
              transition: '.28s ease',
            },
            '& ~ label:before': {
              borderTop: '1px solid transparent',
              borderLeft: '1px solid transparent',
              borderRight: '1px solid ' + backgroundColor,
              borderBottom: '1px solid ' + backgroundColor,
              display: 'inline-block',
              transform: 'rotateZ(390deg)',
              top: '0',
              left: '-23px',
              width: '8px',
              transformOrigin: '100% 100%',
            },
          },
        },
      },
    },
  });
}

export interface CheckBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  block?: boolean;
}

interface State {
  theme: Theme;
}
import * as React from 'react';
import { stylesheet } from 'typestyle';
import { shadow } from '../../helpers/style';
import { borderColor } from '../../helpers/color';
import { ThemeConsumer, Theme } from '../Theme/Theme';

export const Radio: React.FunctionComponent<RadioProps> = (props) => {
  const { label, className, error } = props;
  const input = React.useRef<HTMLInputElement>();

  const onContainerClick = () => {
    if (input.current) {
      input.current.click();
    }
  };
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(props.disabled, props.block, theme);
        return (
          <div className={css.container} onClick={() => onContainerClick()}>
            <input className={css.radio} ref={input} type='radio' {...props} />
            <label className={`${css.label}`}>{label}</label>
            {error &&
              <div style={{ marginTop: '0' }} key='error' className={`${css.errorStyle} ${className || ''}`}>
                {error}
              </div>
            }
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (disabled: boolean, block: boolean, theme: Theme) => {
  const backgroundColor = theme.primary;

  return stylesheet({
    container: {
      cursor: disabled ? 'not-allowed' : 'pointer',
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
          border: `1px solid ${backgroundColor}`,
          position: 'absolute',
          borderRadius: '50%',
          left: '-23px',
          top: '0',
          width: '16px',
          height: '16px',
          zIndex: 0,
          transition: '.4s ease',
          background: `linear-gradient(to bottom, white 50%, ${backgroundColor} 50%)`,
          backgroundSize: '100% 200%',
          backgroundPosition: 'left top',
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
      color: theme.error,
    },
    radio: {
      display: 'none',
      $nest: {
        '&:checked': {
          $nest: {
            '& ~ label:before': {
              backgroundPosition: 'right bottom',
            },
          },
        },
        '&:disabled': {
          color: borderColor(theme.background),
          $nest: {
            '& ~ label:before': {
              border: `1px solid ${borderColor(theme.background)}`,
              background: `linear-gradient(to bottom, white 50%, ${borderColor(theme.background)} 50%)`,
              backgroundPosition: 'right bottom',
            },
          },
        },
      },
    },
  });
};

export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  block?: boolean;
}

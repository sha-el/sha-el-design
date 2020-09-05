import * as React from 'react';
import { stylesheet } from 'typestyle';
import { colorShades } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Col, Row } from '../Grid';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { Text } from '../Text/Text';

export const Progress: React.FC<ProgressProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(props, theme);

        if (props.type === 'circle') {
          const radius = 52;
          const circumference = radius * 2 * Math.PI;
          const offset = circumference - (props.percent / 100) * circumference;
          return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <svg width="120" height="120">
                <circle
                  className={css.circle}
                  style={{ strokeDashoffset: offset, strokeDasharray: `${circumference} ${circumference}` }}
                  stroke={theme[props.status]}
                  strokeWidth="10px"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                />
              </svg>
              <Text style={{ position: 'absolute', top: '45%', textAlign: 'center', width: '100%' }}>
                {props.label}
              </Text>
            </div>
          );
        }

        return (
          <Row>
            <Col flex="1 0 auto">
              <div className={css.container}>
                <div style={{ width: props.percent + '%' }} className={css.line} />
              </div>
            </Col>
            {props.label && <Col flex="0 1 auto">{props.label}</Col>}
          </Row>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (props: ProgressProps, theme: Theme) =>
  stylesheet({
    container: {
      width: '100%',
      minWidth: '200px',
      background: colorShades(theme.background)[2],
      borderRadius: '2px',
      overflow: 'visible',
    },
    line: {
      height: '10px',
      lineHeight: '10px',
      background: theme[props.status],
      borderRadius: '0 2px 2px 0',
      transition: 'all .4s cubic-bezier(.08,.82,.17,1) 0s',
      boxShadow: shadow('BOT2X', theme, theme[props.status]),
    },
    circle: {
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
      transition: '0.35s stroke-dashoffset',
    },
  });

Progress.defaultProps = {
  type: 'line',
  status: 'primary',
};

export interface ProgressProps {
  percent: number;
  type?: 'circle' | 'line';
  text?: string;
  status?: 'primary' | 'secondary' | 'warning' | 'error' | 'info';
  label?: React.ReactNode;
}

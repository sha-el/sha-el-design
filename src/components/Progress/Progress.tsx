import * as React from 'react';
import { Col, Row } from '../Grid';
import { Text } from '../Text/Text';
import { style } from './style';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { ColorChoices } from '../../typings/color';
import { colorFromChoices } from '../../helpers/color';

export const Progress: React.FC<ProgressProps> = (props) => {
  const css = style(props);

  if (props.type === 'circle') {
    const radius = 52;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (props.percent / 100) * circumference;
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width="120" height="120">
          <circle
            className={classes(css.circle, 'sha-el-progress-circle')}
            style={{ strokeDashoffset: offset, strokeDasharray: `${circumference} ${circumference}`, ...props.style }}
            stroke={colorFromChoices(props.color).background}
            strokeWidth="10px"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
        </svg>
        <Text style={{ position: 'absolute', top: '45%', textAlign: 'center', width: '100%' }}>{props.label}</Text>
      </div>
    );
  }

  return (
    <Row alignItems="center">
      <Col style={{ padding: '0.5rem' }} flex="1 0 auto">
        <div className={classes(css.container, 'sha-el-progress', elevationCss(props.elevation))}>
          <div
            style={{ width: props.percent + '%', ...props.style }}
            className={classes(css.line, 'sha-el-progress-line')}
          />
        </div>
      </Col>
      {props.label && (
        <Col style={{ padding: '0.5rem' }} flex="0 1 auto">
          {props.label}
        </Col>
      )}
    </Row>
  );
};

Progress.defaultProps = {
  type: 'line',
  color: 'primary',
  elevation: 2,
  style: {},
};

export interface ProgressProps {
  percent: number;
  type?: 'circle' | 'line';
  color?: ColorChoices;
  label?: React.ReactNode;
  elevation?: number;
  style?: React.CSSProperties;
}

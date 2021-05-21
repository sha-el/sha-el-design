import React from 'react';
import { MdCheck } from 'react-icons/md';
import { classes } from '../../helpers';
import { lightText } from '../../helpers/color';
import { Carousel } from '../Carousel';
import { Divider } from '../Divider';
import { Col, Row } from '../Grid';
import { Text } from '../Text';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export interface StepperProps {
  children: React.ReactElement | React.ReactElement[];
  current?: number;
  direction?: 'horizontal';
  onChange?: (e: number) => void;
  nonLinear?: boolean;
}

export interface StepProps {
  title?: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  error?: string;
}

export const Stepper: React.FC<StepperProps> = (props) => {
  const { current = 0, nonLinear, onChange, direction = 'horizontal' } = props;
  const theme = useTheme();
  const css = style(theme);

  const children: React.ReactElement[] = Array.isArray(props.children)
    ? (props.children as React.ReactElement[])
    : [props.children];

  return (
    <>
      <Row style={{ padding: '10px 0' }} alignItems="center">
        {children.map((el, i) => {
          let iconCss: string;
          let numberCss: string;
          let step: React.ReactNode;

          if (i === current) {
            iconCss = css.activeIcon;
            numberCss = css.active;
          }

          if (el.props.disabled) {
            iconCss = css.disabled;
            numberCss = css.disabled;
          }

          if (!!el.props.error) {
            iconCss = css.error;
            numberCss = css.error;
          }

          if (el.props.icon) {
            step = (
              <Col
                flex="0 1 auto"
                onClick={() => nonLinear && !el.props.disabled && onChange(i)}
                className={classes(css.icon, iconCss, nonLinear && css.clickable)}
              >
                {el.props.icon}
              </Col>
            );
          } else {
            step = (
              <Col
                flex="0 1 auto"
                onClick={() => nonLinear && !el.props.disabled && onChange(i)}
                className={classes(css.number, numberCss, css.container, nonLinear && css.clickable)}
              >
                {i + 1}
              </Col>
            );
          }

          if (!nonLinear && current > i && !el.props.error) {
            step = (
              <Col flex="0 1 auto" className={classes(css.icon, css.success)}>
                <MdCheck />
              </Col>
            );
          }

          const header = (el.props.title || el.props.error || el.props.description) && (
            <Col
              flex="0 1 auto"
              onClick={() => nonLinear && !el.props.disabled && onChange(i)}
              className={classes(iconCss, css.container, nonLinear && css.clickable)}
            >
              {el.props.title}
              <Text variant="p" color="error" margin="0" fontSize="12px">
                {el.props.error}
              </Text>
              <Text variant="p" color="lightText" margin="0" fontSize="12px">
                {el.props.description}
              </Text>
            </Col>
          );

          return (
            <React.Fragment key={`steps-${i}`}>
              {i !== 0 && direction === 'horizontal' && (
                <Col className={css.container} flex="1 0 auto">
                  <Divider color={i === current ? theme.primary : lightText(theme)} />
                </Col>
              )}
              {step}
              {header}
            </React.Fragment>
          );
        })}
      </Row>
      <Carousel hideDots current={current} width="100%">
        {children.map((el) => el.props.children)}
      </Carousel>
    </>
  );
};

export const Step: React.FC<StepProps> = (props) => {
  return <div>{props.children}</div>;
};

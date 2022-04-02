import React from 'react';
import { MdCheck } from 'react-icons/md';
import { classes } from '../../helpers';
import { Divider } from '../Divider';
import { Col, Row } from '../Grid';
import { Text } from '../Text';
import { themeVar } from '../Theme/helper';
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
  const css = style();

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
                <Text style={{ lineHeight: 1.3 }}>{i + 1}</Text>
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
                  <Divider
                    color={
                      i === current
                        ? themeVar.accent.primaryKeyColor.primary
                        : themeVar.neutral.neutralVariantKeyColor.outline
                    }
                  />
                </Col>
              )}
              {step}
              {header}
            </React.Fragment>
          );
        })}
      </Row>
      {children[current]}
    </>
  );
};

export const Step: React.FC<StepProps> = () => {
  return <div />;
};

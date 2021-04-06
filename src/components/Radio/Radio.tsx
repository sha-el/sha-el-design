import * as React from 'react';
import { classes } from '../../helpers';
import { Col, Row } from '../Grid';
import { Text } from '../Text';
import { useTheme } from '../Theme/Theme';
import { radioStyle as style } from './style';

export const Radio: React.FunctionComponent<RadioProps> = (props) => {
  const { label, className } = props;
  const input = React.useRef<HTMLInputElement>();

  const onContainerClick = () => {
    input.current?.click();
  };

  const theme = useTheme();
  const css = style({ disabled: props.disabled, theme });
  return (
    <Row
      style={{ display: 'inline-flex' }}
      alignItems="center"
      className={classes(css.container, className)}
      onClick={() => onContainerClick()}
    >
      <input className={css.input} ref={input} type="radio" {...props} />
      <Col flex="0 0 18px" className={classes(css.radio, 'radio-circle')} />
      <Text variant="label" color="light" margin="0 0 0 9px">
        {label}
      </Text>
    </Row>
  );
};

export interface RadioProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

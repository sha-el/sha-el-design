import * as React from 'react';
import { Text } from '../Text';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md';
import { Col, Row } from '../Grid';
import { disabledColor } from '../../helpers/color';
import { Theme, useTheme } from '../Theme/Theme';
import { style } from './style';

export const CheckBox: React.FunctionComponent<CheckBoxProps> = (props) => {
  const { label, intermediate, onChange, color, disabled, ...rest } = props;

  const [checked, updateChecked] = React.useState(props.checked || intermediate || false);

  const input = React.createRef<HTMLInputElement>();

  const onContainerClick = () => {
    input.current?.click();
  };

  const theme = useTheme();
  const css = style({ theme, checked, color, disabled });

  return (
    <Row alignItems="center" gutter={[0, 0]} className={css.container} onClick={() => !disabled && onContainerClick()}>
      <input
        className={css.input}
        ref={input}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e);
          updateChecked(e.target.checked);
        }}
        {...rest}
      />
      <Col flex="0 1 auto">
        {intermediate ? (
          <MdIndeterminateCheckBox size="22px" className={css.svg} />
        ) : checked ? (
          <MdCheckBox size="22px" className={css.svg} />
        ) : (
          <MdCheckBoxOutlineBlank size="22px" className={css.svg} />
        )}
      </Col>
      <Col flex="1 0 auto">
        <Text color={disabled && disabledColor(theme)} fontSize="1rem" margin="0 0 0 9px">
          {label}
        </Text>
      </Col>
    </Row>
  );
};

export interface CheckBoxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  intermediate?: boolean;
  color?: keyof Theme | string;
  disabled?: boolean;
}

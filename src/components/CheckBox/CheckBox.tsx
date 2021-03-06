import * as React from 'react';
import { Text } from '../Text';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md';
import { Col, Row } from '../Grid';
import { disabledColor, lightText } from '../../helpers/color';
import { Theme, useTheme } from '../Theme/Theme';
import { style } from './style';

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { label, intermediate, onChange, color, disabled, ...rest } = props;

  const [checked, updateChecked] = React.useState(props.checked || intermediate || false);

  const input = React.createRef<HTMLInputElement>();

  const onContainerClick = () => {
    input.current?.click();
  };

  const theme = useTheme();
  const css = style(disabled, theme, checked, color);

  return (
    <Row alignItems="center" className={css.container} onClick={() => !disabled && onContainerClick()}>
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
        <Text
          variant="label"
          color={(disabled && disabledColor(theme)) || lightText(theme)}
          fontSize="13px"
          margin="0 0 0 9px"
        >
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

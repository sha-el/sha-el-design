import * as React from 'react';
import { stylesheet } from 'typestyle';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { Text } from '../Text';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md';
import { Col, Row } from '../Grid';
import { disabledColor, lightText } from '../../helpers/color';

export const CheckBox: React.FunctionComponent<CheckBoxProps> = (props) => {
  const { label, intermediate, onChange, color, disabled, ...rest } = props;

  const [checked, updateChecked] = React.useState(props.checked || intermediate || false);

  const input = React.createRef<HTMLInputElement>();

  const onContainerClick = () => {
    if (input.current) {
      input.current.click();
    }
  };

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme, checked, color, disabled);

        return (
          <Row
            alignItems="center"
            gutter={[0, 0]}
            className={css.container}
            onClick={() => !disabled && onContainerClick()}
          >
            <input
              className={css.input}
              ref={input}
              type="checkbox"
              checked={checked}
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
      }}
    </ThemeConsumer>
  );
};

const style = (theme: Theme, checked: boolean, color: CheckBoxProps['color'], disabled: boolean) => {
  return stylesheet({
    container: {
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    input: {
      display: 'none',
    },
    svg: {
      fill: disabled ? disabledColor(theme) : checked ? theme[color] || color : lightText(theme),
    },
  });
};

export interface CheckBoxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  intermediate?: boolean;
  color?: keyof Theme | string;
  disabled?: boolean;
}

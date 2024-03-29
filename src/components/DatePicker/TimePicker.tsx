import * as React from 'react';
import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { Popover } from '../Popover';
import { Row, Col } from '../Grid';
import { arrayBetween } from '../../helpers/array';
import { Button } from '../Button';
import { MdTimer } from 'react-icons/md';
import { style } from './style';
import { Text } from '../Text';
import { useTheme } from '../Theme/Theme';
import { classes } from '../../helpers';

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { onChange, time = new Date(0, 0, 0, 0, 0, 0), use12Hour, ...inputProps } = props;
  const [inputValue, updateInputValue] = React.useState<string>(formatTime(time, use12Hour));
  const [visible, updateVisible] = React.useState(false);

  const hourEl = React.useRef<HTMLDivElement>();
  const minEl = React.useRef<HTMLDivElement>();
  const secEl = React.useRef<HTMLDivElement>();

  const handleChange = (h?: number, m?: number, s?: number) => {
    const hour = h ?? time.getHours();
    const minute = m ?? time.getMinutes();
    const sec = s ?? time.getSeconds();

    const date = new Date(time.getFullYear(), time.getMonth(), time.getDate());
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(sec);

    if (isNaN(date.getTime())) {
      updateInputValue(formatTime(time, use12Hour));
      return;
    }

    onChange?.(date);
    updateInputValue(formatTime(date, use12Hour));
    scrollToEl({ hourEl, minEl, secEl }, hour, minute, sec);
  };

  const handleInputValueUpdate = (value: string) => {
    let [hour, min, sec, ampm] = value.split(':');
    if (use12Hour) {
      [sec, ampm] = sec.split(' ');
      hour = String(to24HourFormat(Number(hour), ampm as 'AM'));
    }
    min = min;
    if (Number(hour) !== time.getHours() || Number(min) !== time.getMinutes() || Number(sec) !== time.getSeconds()) {
      handleChange(Number(hour), Number(min), Number(sec));
    }
  };

  const css = style(useTheme());

  const inputComponent = (
    <Input
      {...inputProps}
      value={inputValue}
      onChange={({ target: { value } }) => updateInputValue(value)}
      onBlur={({ target: { value } }) => handleInputValueUpdate(value)}
      onKeyDown={({ key, target }) => {
        if (key === 'Enter') {
          handleInputValueUpdate((target as HTMLInputElement).value);
        }
        if (key === 'ArrowDown') {
          updateVisible(true);
        }

        if (key === 'Escape') {
          updateVisible(false);
        }
      }}
      after={
        <>
          {!props.open && <Button flat shape="circle" icon={<MdTimer />} disabled={props.disabled} />}
          {inputProps.after}
        </>
      }
    />
  );

  if (props.open) {
    return (
      <div className="sha-el-timepicker">
        {inputComponent}
        {content(css, props, handleChange, time, updateVisible, { hourEl, minEl, secEl })}
      </div>
    );
  }

  return (
    <>
      <Popover
        overlay={content(css, props, handleChange, time, updateVisible, { hourEl, minEl, secEl })}
        trigger={['onClick']}
        placement="bottom-start"
        visible={!props.disabled && visible}
        padding={0}
        onVisibleChange={(e) => !props.disabled && updateVisible(e)}
        hideArrow
      >
        {inputComponent}
      </Popover>
    </>
  );
};

const content = (
  css: string,
  props: TimePickerProps,
  onChange: (h?: number, m?: number, s?: number) => void,
  time: Date,
  updateVisible: (v: boolean) => void,
  refs: Record<'hourEl' | 'minEl' | 'secEl', React.MutableRefObject<HTMLDivElement>>,
) => {
  const hourArray: number[] = [];
  props.use12Hour && hourArray.push(12);
  (props.use12Hour ? arrayBetween(1, 12) : arrayBetween(0, 24)).map((v) => hourArray.push(v));

  return (
    <div className={classes(css, 'sha-el-timepicker')}>
      <Row gutter={0}>
        <Col span={6} className="hour-column" ref={refs.hourEl}>
          {hourArray.map((v) => (
            <Text
              margin="0"
              padding="5px 15px"
              variant="p"
              background={(!props.use12Hour ? time.getHours() : to12HourFormat(time.getHours())) === v && 'primary'}
              onClick={() => {
                if (!props.use12Hour) {
                  return onChange(v);
                }
                onChange(to24HourFormat(v, time.getHours() < 12 ? 'AM' : 'PM'));
              }}
              key={v}
            >
              {v}
            </Text>
          ))}
        </Col>
        <Col span={6} className="min-column" ref={refs.minEl}>
          {arrayBetween(0, 60).map((v) => (
            <Text
              margin="0"
              padding="5px 15px"
              variant="p"
              background={time.getMinutes() === v && 'primary'}
              onClick={() => onChange(undefined, v)}
              key={v}
            >
              {v}
            </Text>
          ))}
        </Col>
        <Col span={6} className="sec-column" ref={refs.secEl}>
          {arrayBetween(0, 60).map((v) => (
            <Text
              margin="0"
              padding="5px 15px"
              variant="p"
              background={time.getSeconds() === v && 'primary'}
              onClick={() => onChange(undefined, undefined, v)}
              key={v}
            >
              {v}
            </Text>
          ))}
        </Col>
        {props.use12Hour && (
          <Col span={6} className="am-column">
            <Text
              margin="0"
              padding="5px 15px"
              variant="p"
              background={time.getHours() < 12 && 'primary'}
              onClick={() => handleAmPmChange('AM', time, onChange)}
            >
              AM
            </Text>
            <Text
              margin="0"
              padding="5px 15px"
              variant="p"
              background={time.getHours() >= 12 && 'primary'}
              onClick={() => handleAmPmChange('PM', time, onChange)}
            >
              PM
            </Text>
          </Col>
        )}
      </Row>
      <Button
        flat
        primary
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          const date = new Date();
          onChange(date.getHours(), date.getMinutes(), date.getSeconds());
          updateVisible(false);
        }}
      >
        Now
      </Button>
    </div>
  );
};

const scrollToEl = (
  elem: Record<'hourEl' | 'minEl' | 'secEl', React.MutableRefObject<HTMLDivElement>>,
  h: number,
  m: number,
  s: number,
) => {
  elem.hourEl.current
    ? (elem.hourEl.current.scrollTop = (elem.hourEl.current?.children[h] as HTMLDivElement)?.offsetTop)
    : 0;
  elem.minEl.current
    ? (elem.minEl.current.scrollTop = (elem.minEl.current?.children[m] as HTMLDivElement)?.offsetTop)
    : 0;
  elem.secEl.current
    ? (elem.secEl.current.scrollTop = (elem.secEl.current?.children[s] as HTMLDivElement)?.offsetTop)
    : 0;
};

type InputType = Omit<InputProps, 'onClick' | 'value' | 'onChange'>;

export interface TimePickerProps extends InputType {
  time?: Date;
  onChange?: (time: Date | null) => void;
  use12Hour?: boolean;
  open?: boolean;
}

const handleAmPmChange = (amPm: 'AM' | 'PM', time: Date, onChange: (h?: number, m?: number, s?: number) => void) => {
  if (amPm === 'AM') {
    return onChange(time.getHours() % 12);
  }

  return onChange(time.getHours() + 12);
};

const formatTime = (time: Date, use12Hour: boolean) => {
  let hour = time.getHours();
  if (use12Hour) {
    hour = to12HourFormat(hour);
  }

  const formatNum = (n: number) => {
    return n < 10 ? '0' + n : n;
  };

  const amPm = () => {
    if (!use12Hour) {
      return '';
    }
    if (time.getHours() >= 12) {
      return ' PM';
    }
    return ' AM';
  };

  const min = formatNum(time.getMinutes());
  const sec = formatNum(time.getSeconds());

  return `${formatNum(hour)}:${min}:${sec}${amPm()}`;
};

const to24HourFormat = (hour: number, amPm: 'AM' | 'PM') => {
  if (amPm === 'PM') {
    return hour + 12;
  }

  if (amPm === 'AM' && hour === 12) {
    return 0;
  }

  return hour;
};

const to12HourFormat = (hour: number) => {
  if (hour > 12) {
    return hour - 12;
  }

  if (hour === 0) {
    return 12;
  }

  return hour;
};

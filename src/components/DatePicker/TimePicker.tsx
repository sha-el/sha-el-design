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

  return (
    <>
      <Popover
        style={{ child: { display: 'block' } }}
        content={content(css, props, handleChange, time, updateVisible, { hourEl, minEl, secEl })}
        trigger={['onClick']}
        position="bottomLeft"
        visible={!props.disabled && visible}
        preserveOnClose
        onVisibleChange={(e) => !props.disabled && updateVisible(e)}
        hideArrow
      >
        <div>
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
            }}
            after={
              <>
                <Button flat shape="circle" icon={<MdTimer />} />
                {inputProps.after}
              </>
            }
          />
        </div>
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
) => (
  <div className={css}>
    <Row>
      <Col span={6} className="hour-column" ref={refs.hourEl}>
        {arrayBetween(0, !props.use12Hour ? 24 : 12).map((v) => (
          <Text
            margin="0"
            padding="5px 15px"
            variant="p"
            fontSize="16px"
            background={(!props.use12Hour ? time.getHours() : time.getHours() % 12) === v && 'primary'}
            onClick={() => {
              if (!props.use12Hour) {
                return onChange(v);
              }
              onChange(to24HourFormat(v, time.getHours() % 12 < 12 ? 'AM' : 'PM'));
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
            fontSize="16px"
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
            fontSize="16px"
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
            fontSize="16px"
            background={time.getHours() < 12 && 'primary'}
            onClick={() => handleAmPmChange('AM', time, onChange)}
          >
            AM
          </Text>
          <Text
            margin="0"
            padding="5px 15px"
            variant="p"
            fontSize="16px"
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
    hour = time.getHours() % 12;
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

  return hour;
};

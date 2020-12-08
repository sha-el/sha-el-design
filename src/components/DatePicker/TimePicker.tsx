import * as React from 'react';
import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { Popover } from '../Popover';
import { Row, Col } from '../Grid';
import { arrayBetween } from '../../helpers';
import { Button } from '../Button';
import { MdTimer } from 'react-icons/md';
import { style } from 'typestyle';

export const TimePicker: React.FunctionComponent<TimePickerProps> = (props) => {
  const { onChange, time = [0, 0, 0], ...inputProps } = props;

  const [amPmValue, updateAmPm] = React.useState<'AM' | 'PM'>(to12HourFormat(time[0])[1] as 'AM' | 'PM');

  const handleChange = (h?: number, m?: number, s?: number) => {
    const hour = h ?? time[0];
    const minute = m ?? time[1];
    const sec = s ?? time[2];

    onChange?.([hour, minute, sec]);
    updateAmPm(hour > 12 ? 'PM' : 'AM');
  };

  return (
    <>
      <Popover
        style={{ child: { display: 'block' } }}
        content={content(props, handleChange, amPmValue)}
        trigger="onClick"
        expand
        hideArrow
      >
        <div>
          <Input
            {...inputProps}
            value={formatTime(time, props.use24Hour || false)}
            readOnly
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

const content = (props: TimePickerProps, onChange: (h?: number, m?: number, s?: number) => void, amPm: 'AM' | 'PM') => (
  <div className={css}>
    <Row>
      <Col span={6}>
        {arrayBetween(0, props.use24Hour ? 24 : 12).map((v) => (
          <div
            onClick={() => {
              if (props.use24Hour) {
                return onChange(v);
              }
              onChange(to24HourFormat(v, amPm));
            }}
            key={v}
          >
            {v}
          </div>
        ))}
      </Col>
      <Col span={6}>
        {arrayBetween(0, 60).map((v) => (
          <div onClick={() => onChange(undefined, v)} key={v}>
            {v}
          </div>
        ))}
      </Col>
      <Col span={6}>
        {arrayBetween(0, 60).map((v) => (
          <div onClick={() => onChange(undefined, undefined, v)} key={v}>
            {v}
          </div>
        ))}
      </Col>
      {!props.use24Hour && (
        <Col span={6}>
          <div onClick={() => handleAmPmChange('AM', props.time || [0, 0, 0], onChange)}>AM</div>
          <div onClick={() => handleAmPmChange('PM', props.time || [0, 0, 0], onChange)}>PM</div>
        </Col>
      )}
    </Row>
    <Button
      flat
      type="secondary"
      onClick={() => {
        const date = new Date();

        onChange(date.getHours(), date.getMinutes(), date.getSeconds());
      }}
    >
      Now
    </Button>
  </div>
);

const css = style({
  $nest: {
    '.sha-el-col': {
      maxHeight: '300px',
      overflowY: 'hidden',
      cursor: 'pointer',
      minWidth: '50px',
      $nest: {
        '&:hover': {
          overflowY: 'auto',
        },
        div: {
          padding: '2px',
          $nest: {
            '&:hover': {
              background: '#ccc',
            },
          },
        },
      },
    },
  },
});

type InputType = Omit<InputProps, 'onClick' | 'value' | 'onChange'>;

export type TimeTupple = [number, number, number];

export interface TimePickerProps extends InputType {
  time?: TimeTupple;
  onChange?: (time: TimeTupple | null) => void;
  use24Hour?: boolean;
}

const handleAmPmChange = (
  amPm: 'AM' | 'PM',
  time: TimeTupple,
  onChange: (h?: number, m?: number, s?: number) => void,
) => {
  if (amPm === 'AM') {
    return onChange(time[0] % 12);
  }

  return onChange(time[0] + 12);
};

const formatNum = (n: number) => {
  return n < 10 ? '0' + n : n;
};

const formatTime = (time: TimeTupple, use24Hour: boolean) => {
  // tslint:disable-next-line: prefer-const
  let [hour, amPm] = to12HourFormat(time[0]);
  amPm = amPm;

  if (use24Hour) {
    hour = time[0];
    (amPm as '') = '';
  }

  const min = formatNum(time[1]);
  const sec = formatNum(time[2]);

  return `${formatNum(hour)}:${min}:${sec} ${amPm}`;
};

const to12HourFormat = (hour: number): [number, 'AM' | 'PM'] => {
  if (hour > 12) {
    return [hour % 12, 'PM'];
  }

  return [hour, 'AM'];
};

const to24HourFormat = (hour: number, amPm: 'AM' | 'PM') => {
  if (amPm === 'PM') {
    return hour + 12;
  }

  return hour;
};

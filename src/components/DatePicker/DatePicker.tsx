import * as React from 'react';
import { InputProps, Input } from '../Input/Input';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Row, Col } from '../Grid';
import { CalendarProps, DateTupple } from '../Calendar/Calendar';
import { TimePickerProps, TimePicker, TimeTupple } from './TimePicker';
import { Popover } from '../Popover';
import { IoMdCalendar } from 'react-icons/io';

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  const {
    after,
    cellRender,
    callendarEvents,
    disabledDate,
    onChange,
    timePickerProps,
    displayProp = (d) => defaultDisplayProp(d, !!timePickerProps),
    ...rest
  } = props;

  const date = toDate(props.date);

  const [time, onTimeChange] = React.useState<TimeTupple | null>([
    date?.getHours() || 0,
    date?.getMinutes() || 0,
    date?.getSeconds() || 0,
  ]);

  return (
    <>
      <Popover
        content={
          <Row gutter={['0', '0']}>
            <Col span={24}>
              <Calendar
                date={date || undefined}
                cellRender={cellRender}
                callendarEvents={callendarEvents}
                disabledDate={disabledDate}
                onClick={(d) => {
                  handleDateChange(toDate(d), time, onChange);
                }}
              />
            </Col>
            <Col style={{ padding: '10px' }}>
              {timePickerProps && (
                <>
                  <TimePicker
                    {...timePickerProps}
                    time={time || undefined}
                    onChange={(t) => handleTimeChange(t, date, onTimeChange, onChange)}
                  />
                </>
              )}
            </Col>
          </Row>
        }
        style={{ child: { display: 'block' } }}
        hideArrow
        expand
        trigger="onClick"
      >
        <Input
          {...rest}
          value={displayProp(props.date)}
          readOnly
          after={
            <>
              <Button flat shape="circle" icon={<IoMdCalendar />} />
              {after}
            </>
          }
        />
      </Popover>
    </>
  );
};

type InputType = Omit<InputProps, 'onClick' | 'value' | 'onChange'>;
type CalendarType = Omit<CalendarProps, 'onClick'>;

export interface DatePickerProps extends InputType, CalendarType {
  displayProp?: (date?: DateTupple | Date | null) => string;
  onChange?: (tupple?: DateTupple | null, date?: Date | null) => void;

  timePickerProps?: TimePickerProps;
}

const toDate = (date: Date | DateTupple | null | undefined) => {
  if (!date) {
    return null;
  }

  if (Array.isArray(date)) {
    return new Date(...date);
  }

  return date;
};

const toDateTupple = (date: Date | DateTupple | null): DateTupple | null => {
  if (!date) {
    return null;
  }

  if (Array.isArray(date)) {
    return date;
  }

  return [date.getFullYear(), date.getMonth(), date.getDate()];
};

const handleTimeChange = (
  time: TimeTupple | null,
  date: Date | null,
  onChange: (time: TimeTupple | null) => void,
  update: DatePickerProps['onChange'],
) => {
  onChange(time);
  handleDateChange(date, time, update);
};

const handleDateChange = (d: Date | null, time: TimeTupple | null, onChange: DatePickerProps['onChange']) => {
  if (time) {
    d?.setHours(...time);
  }

  onChange?.(toDateTupple(d), d);
};

const defaultDisplayProp = (d: DateTupple | Date | null | undefined, withTime: boolean) => {
  if (!d) {
    return '';
  }
  const date = toDate(d);

  if (withTime) {
    return date?.toLocaleString();
  }

  return date?.toDateString();
};

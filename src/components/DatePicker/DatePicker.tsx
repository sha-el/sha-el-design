import * as React from 'react';
import { InputProps, Input } from '../Input/Input';
import { Button } from '../Button';
import { MdPermContactCalendar } from 'react-icons/md';
import { Calendar } from '../Calendar';
import { Modal } from '../Modal';
import { Row, Col } from '../Grid';
import { CalendarProps, DateTupple } from '../Calendar/Calendar';
import { ThemeService } from '../../helpers/theme';
import { format } from 'date-fns';
import { getColor } from '../../helpers';
import { TimePickerProps, TimePicker, TimeTupple } from './TimePicker';

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  const {
    after, cellRender,
    callendarEvents, disabledDate,
    onChange,
    timePickerProps,
    displayProp = (d) => defaultDisplayProp(d, !!timePickerProps),
    ...rest
  } = props;

  const date = toDate(props.date);

  const [calendar, toggleCalendar] = React.useState(false);
  const [time, onTimeChange] = React.useState<TimeTupple>([date.getHours(), date.getMinutes(), date.getSeconds()]);
  const themeService = new ThemeService();

  return (
    <>
      <Input
        {...rest}
        value={displayProp(props.date)}
        readOnly
        onFocus={() => toggleCalendar(true)}
        after={
          <>
            <Button
              flat
              shape='circle'
              icon={<MdPermContactCalendar />}
              onClick={() => toggleCalendar(true)}
            />
            {after}
          </>
        }
      />
      <Modal
        isVisible={calendar}
        onClose={() => toggleCalendar(false)}
      >
        <Row gutter={['0', '0']}>
          <Col style={{ display: 'flex' }} span={8}>
            <div
              style={{
                background: themeService.selectedTheme$.value.primary,
                padding: '16px',
                borderTopRightRadius: '4px',
                color: getColor(themeService.selectedTheme$.value.primary),
                width: '100%',
              }}
            >
              <h6 className='secondary-text-color'>{date.getFullYear()}</h6>
              <h5>{format(date, 'eee')},</h5>
              <h4>{format(date, 'MMM')} {format(date, 'do')}</h4>
              {
                timePickerProps && (
                  <>
                    <h6>At</h6>
                    <TimePicker
                      {...timePickerProps}
                      time={time}
                      onChange={(t) => handleTimeChange(t, date, onTimeChange, props.onChange)}
                    />
                  </>
                )
              }
            </div>
          </Col>
          <Col span={16}>
            <Calendar
              date={date}
              cellRender={cellRender}
              callendarEvents={callendarEvents}
              disabledDate={disabledDate}
              onClick={(d) => {
                toggleCalendar(false);
                handleDateChange(toDate(d), time, props.onChange);
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

type InputType = Omit<InputProps, 'onClick' | 'value' | 'onChange'>;
type CalendarType = Omit<CalendarProps, 'onClick'>;

export interface DatePickerProps extends InputType, CalendarType {
  displayProp?: (date?: DateTupple | Date) => string;
  onChange?: (tupple?: DateTupple, date?: Date) => void;

  timePickerProps?: TimePickerProps;
}

const toDate = (date: Date | DateTupple) => {
  if (!date) {
    return null;
  }
  if (Array.isArray(date)) {
    return new Date(...date);
  }

  return date;
};

const toDateTupple = (date: Date | DateTupple): DateTupple => {
  if (!date) {
    return null;
  }

  if (Array.isArray(date)) {
    return date;
  }

  return [date.getFullYear(), date.getMonth(), date.getDate()];
};

const handleTimeChange = (time: TimeTupple, date: Date, onChange: (time: TimeTupple) => void, update: DatePickerProps['onChange']) => {
  onChange(time);
  handleDateChange(date, time, update);
};

const handleDateChange = (d: Date, time: TimeTupple, onChange: DatePickerProps['onChange']) => {
  if (time) {
    d.setHours(...time);
  }

  onChange(toDateTupple(d), d);
};

const defaultDisplayProp = (d: DateTupple | Date, withTime: boolean) => {
  const date = toDate(d);

  if (withTime) {
    return date.toLocaleString();
  }

  return date.toDateString();
};

DatePicker.defaultProps = {
  date: new Date(),
};
import * as React from 'react';
import { InputProps, Input } from '../Input/Input';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Row, Col } from '../Grid';
import { CalendarProps } from '../Calendar/Calendar';
import { TimePickerProps, TimePicker } from './TimePicker';
import { Popover } from '../Popover';
import { IoMdCalendar } from 'react-icons/io';

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    after,
    cellRender,
    calendarEvents,
    disabledDate,
    onChange,
    timePickerProps,
    displayProp = (d) => defaultDisplayProp(d, !!timePickerProps),
    filled: __filled,
    ...rest
  } = props;

  const [visible, updateVisible] = React.useState(false);
  const date = toDate(props.date);

  return (
    <>
      <Popover
        padding={0}
        overlay={
          <Row gutter={0}>
            <Col
              span={props.timePickerProps && 12.5}
              style={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}
            >
              <Calendar
                elevation={0}
                margin={0}
                date={date || undefined}
                cellRender={cellRender}
                calendarEvents={calendarEvents}
                disabledDate={disabledDate}
                onClick={(d) => {
                  onChange(d);
                  if (!timePickerProps) {
                    updateVisible(false);
                  }
                }}
              />
            </Col>
            {timePickerProps && (
              <>
                <Col span={11.5} style={{ borderBottom: '1px solid #eee' }}>
                  <TimePicker
                    open
                    borderless
                    style={{ textAlign: 'center' }}
                    {...timePickerProps}
                    time={date || undefined}
                    onChange={(t) => onChange(t)}
                  />
                </Col>
                <Col span={4} offset={20}>
                  <Button primary text onClick={() => updateVisible(false)}>
                    Close
                  </Button>
                </Col>
              </>
            )}
          </Row>
        }
        visible={visible}
        onVisibleChange={updateVisible}
        style={{ width: '450px' }}
        hideArrow
        trigger={['onClick']}
      >
        <Input
          {...rest}
          value={displayProp(props.date)}
          readOnly
          after={
            <>
              <Button onClick={() => updateVisible(!visible)} text icon={<IoMdCalendar />} />
              {after}
            </>
          }
        />
      </Popover>
    </>
  );
};

type InputType = Omit<InputProps, 'onClick' | 'value' | 'onChange' | 'filled'>;
type CalendarType = Omit<CalendarProps, 'onChange' | 'onClick'>;

export interface DatePickerProps extends InputType, CalendarType {
  displayProp?: (date?: Date | null) => string;
  onChange?: (date?: Date | null) => void;

  timePickerProps?: TimePickerProps;
}

const toDate = (date: Date | null | undefined): Date | null => {
  return date ?? null;
};

const defaultDisplayProp = (d: Date | null | undefined, withTime: boolean) => {
  if (!d) {
    return '';
  }
  const date = toDate(d);

  if (withTime) {
    return date?.toLocaleString();
  }

  return date?.toLocaleDateString();
};

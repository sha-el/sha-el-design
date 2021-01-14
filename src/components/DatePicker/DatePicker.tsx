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
    ...rest
  } = props;

  const [visible, updateVisible] = React.useState(false);
  const date = toDate(props.date);

  return (
    <>
      <Popover
        content={
          <Row gutter={['0', '0']}>
            <Col span={24}>
              <Calendar
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
              <Col style={{ padding: '10px' }}>
                <TimePicker {...timePickerProps} time={date || undefined} onChange={(t) => onChange(t)} />
              </Col>
            )}
          </Row>
        }
        visible={visible}
        onVisibleChange={updateVisible}
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

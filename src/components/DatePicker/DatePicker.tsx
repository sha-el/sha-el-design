import * as React from "react";
import { InputProps, Input } from "../Input/Input";
import { Button } from "../Button";
import { Text } from "../Text";
import { MdPermContactCalendar } from "react-icons/md";
import { Calendar } from "../Calendar";
import { Modal } from "../Modal";
import { Row, Col } from "../Grid";
import { CalendarProps, DateTupple } from "../Calendar/Calendar";
import { format } from "date-fns";
import { getColor } from "../../helpers";
import { TimePickerProps, TimePicker, TimeTupple } from "./TimePicker";
import { ThemeConsumer } from "../Theme/Theme";
import {lightText} from "../../helpers/color";

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

  const [calendar, toggleCalendar] = React.useState(false);
  const [time, onTimeChange] = React.useState<TimeTupple>([
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]);

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
              shape="circle"
              icon={<MdPermContactCalendar />}
              onClick={() => toggleCalendar(true)}
            />
            {after}
          </>
        }
      />
      <Modal isVisible={calendar} onClose={() => toggleCalendar(false)}>
        <ThemeConsumer>
          {(theme) => (
            <Row gutter={["0", "0"]}>
              <Col style={{ display: "flex" }} span={8}>
                <div
                  style={{
                    background: theme.primary,
                    padding: "16px",
                    borderTopRightRadius: "4px",
                    color: getColor(theme.primary),
                    width: "100%",
                  }}
                >
                  <Text margin="0" variant="h4" color={lightText(theme)}>{date.getFullYear()}</Text>
                  <h5>{format(date, "eee")},</h5>
                  <h4>
                    {format(date, "MMM")} {format(date, "do")}
                  </h4>
                  {timePickerProps && (
                    <>
                      <h6>At</h6>
                      <TimePicker
                        {...timePickerProps}
                        time={time}
                        onChange={(t) =>
                          handleTimeChange(
                            t,
                            date,
                            onTimeChange,
                            props.onChange
                          )
                        }
                      />
                    </>
                  )}
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
          )}
        </ThemeConsumer>
      </Modal>
    </>
  );
};

type InputType = Omit<InputProps, "onClick" | "value" | "onChange">;
type CalendarType = Omit<CalendarProps, "onClick">;

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

const handleTimeChange = (
  time: TimeTupple,
  date: Date,
  onChange: (time: TimeTupple) => void,
  update: DatePickerProps["onChange"]
) => {
  onChange(time);
  handleDateChange(date, time, update);
};

const handleDateChange = (
  d: Date,
  time: TimeTupple,
  onChange: DatePickerProps["onChange"]
) => {
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


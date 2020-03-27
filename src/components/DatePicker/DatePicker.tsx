import * as React from 'react';
import { InputProps, Input } from '../Input/Input';
import { Button } from '../Button';
import { MdPermContactCalendar } from 'react-icons/md';
import { Calendar } from '../Calendar';
import { Modal } from '../Modal';
import { Row, Col } from '../Grid';
import { CalendarProps, DateTupple } from 'components/Calendar/Calendar';
import { ThemeService } from '../../helpers/theme';
import { format } from 'date-fns';
import { getColor } from '../../helpers';

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  const {
    after, cellRender,
    callendarEvents, isDateDisabled,
    onChange,
    ...rest
  } = props;

  const [calendar, toggleCalendar] = React.useState(false);
  const themeService = new ThemeService();

  const date = toDate(props.date);

  return (
    <>
      <Input
        {...rest}
        defaultValue={props.displayProp(props.date) as any}
        onFocus={() => toggleCalendar(true)}
        after={
          <Button
            flat
            shape='circle'
            icon={<MdPermContactCalendar />}
            onClick={() => toggleCalendar(true)}
          />
        }
      />
      <Modal
        isVisible={calendar}
        onClose={() => toggleCalendar(false)}
      >
        <Row gutter={['0', '0']}>
          <Col style={{ display: 'flex' }} span={6}>
            <div
              style={{
                background: themeService.selectedTheme$.value.primary,
                padding: '16px',
                borderTopRightRadius: '4px',
                color: getColor(themeService.selectedTheme$.value.primary),
              }}
            >
              <h6 className='secondary-text-color'>{date.getFullYear()}</h6>
              <h5>{format(date, 'eee')},</h5>
              <h4>{format(date, 'MMM')} {format(date, 'do')}</h4>
            </div>
          </Col>
          <Col span={18}>
            <Calendar
              date={date}
              cellRender={cellRender}
              callendarEvents={callendarEvents}
              isDateDisabled={isDateDisabled}
              onClick={(d) => {
                toggleCalendar(false);
                onChange(d, new Date(...d));
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

interface DatePickerProps extends InputType, CalendarType {
  displayProp?: (date?: DateTupple | Date) => string;
  onChange?: (tupple?: DateTupple, date?: Date) => void;
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

DatePicker.defaultProps = {
  displayProp: (date) => {
    if (!date) {
      return '';
    }
    if (Array.isArray(date)) {
      return new Date(...date).toLocaleDateString();
    }

    return date.toLocaleString();
  },
};
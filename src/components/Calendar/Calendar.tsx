import * as React from 'react';
import { nestedAccess, arrayBetween } from './../../helpers';
import { Row, Col } from './../../index';
import { Card, CardBody } from '../Card';
import { color } from 'csx';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { Menu, MenuItem } from '../Menu';
import { style } from './style';
import { daysInMonth, compareDesc } from '../../helpers/date';

export const Calendar: React.FC<CalendarProps> = (props) => {
  const initialDate = (date = props.date) => {
    return date ?? new Date();
  };

  const toWeeksDateArray = (date = initialDate()) => {
    const dateObj: Record<weeksEnum, number>[] = [];
    let monthStart = 1;
    for (let i = 0; i < 6; i++) {
      const obj: Record<weeksEnum, number> = {} as Record<weeksEnum, number>;
      for (let j = new Date(date.getFullYear(), date.getMonth(), monthStart).getDay(); j < 7; j++) {
        if (monthStart > daysInMonth(date.getFullYear(), date.getMonth())) {
          break;
        }
        obj[weeks[j]] = monthStart;
        monthStart++;
      }
      dateObj.push(obj);
    }
    return dateObj;
  };

  const [date, updateDate] = React.useState<State['date']>(initialDate());
  const [weeksDateArray, updatetoWeeksDateArray] = React.useState<State['dateObj']>(toWeeksDateArray());

  const isToday = (day: number): boolean => {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const monthChange = (month: string) => {
    const newDate = date;
    newDate.setMonth(months.indexOf(month));
    updateDate(newDate);
    updatetoWeeksDateArray(toWeeksDateArray(newDate));
  };

  const yearChange = (year: number) => {
    const newDate = date;
    newDate.setFullYear(year);
    updateDate(newDate);
    updatetoWeeksDateArray(toWeeksDateArray(newDate));
  };

  const calendarEvent = (day: number, style: Record<'badge', string>) => {
    if (!day) {
      return;
    }
    const { calendarEvents } = props;
    const [year, month] = [date.getFullYear(), date.getMonth()];
    if (!calendarEvents) {
      return;
    }

    return calendarEvents.map((v) => {
      const [startDate, endDate] = [initialDate(v.startDate), initialDate(v.endDate)];
      if (day === startDate[2] && month === startDate[1] && year === startDate[0]) {
        return (
          <Tooltip placement="top" trigger={['hover']} overlay={v.eventName}>
            <div
              className={style.badge}
              style={{
                borderRadius: '4px 0 0 4px',
                background: v.color || '#fcc',
                boxShadow:
                  '0 10px 14px ' +
                  color(v.color || '#fcc')
                    .fade(0.4)
                    .toString(),
              }}
            />
          </Tooltip>
        );
      }

      if (
        compareDesc(startDate, new Date(year, month, day)) === 1 &&
        compareDesc(new Date(year, month, day), endDate) === 1
      ) {
        return (
          <Tooltip placement="top" trigger={['hover']} overlay={v.eventName}>
            <div
              className={style.badge}
              style={{
                background: v.color || '#fcc',
                boxShadow:
                  '0 10px 14px ' +
                  color(v.color || '#fcc')
                    .fade(0.4)
                    .toString(),
              }}
            />
          </Tooltip>
        );
      }

      if (day === endDate[2] && month === endDate[1] && year === endDate[0]) {
        return (
          <Tooltip placement="top" trigger={['hover']} overlay={v.eventName}>
            <div
              className={style.badge}
              style={{
                borderRadius: '0 4px 4px 0',
                background: v.color || '#fcc',
                boxShadow:
                  '0 10px 14px ' +
                  color(v.color || '#fcc')
                    .fade(0.4)
                    .toString(),
              }}
            />
          </Tooltip>
        );
      }
    });
  };

  const css = style;

  return (
    <Card elevation={props.elevation}>
      <CardBody>
        <Row gutter={[10, 10]} justifyContent="flex-end">
          <Col flex="0 1 auto">
            <Menu
              height="300px"
              trigger="onClick"
              anchor={
                <Button primary displayBlock flat>
                  {months[date.getMonth()]}
                </Button>
              }
            >
              {months.map((v) => (
                <MenuItem active={v === months[date.getMonth()]} onClick={() => monthChange(v)} key={v}>
                  {v}
                </MenuItem>
              ))}
            </Menu>
          </Col>
          <Col flex="0 1 auto">
            <Menu
              height="300px"
              trigger="onClick"
              anchor={
                <Button primary displayBlock flat>
                  {date.getFullYear()}
                </Button>
              }
            >
              {arrayBetween(1980, 2030).map((v) => (
                <MenuItem active={v === date.getFullYear()} onClick={() => yearChange(v)} key={v}>
                  {v}
                </MenuItem>
              ))}
            </Menu>
          </Col>
        </Row>
        <Row gutter={[0, 0]}>
          {weeks.map((v) => (
            <Col span={24 / 7} key={v}>
              <Text fontWeight={600} textAlign="center" variant="p" color="light">
                {v.slice(0, 3)}
              </Text>
            </Col>
          ))}
        </Row>
        <Row gutter={[0, 0]}>
          {weeksDateArray.map((v) => {
            return weeks.map((f, i) => {
              const selectedDate = props.date;
              const isSelectedDate =
                selectedDate &&
                compareDesc(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    nestedAccess(v, f),
                    selectedDate.getHours(),
                    selectedDate.getMinutes(),
                    selectedDate.getSeconds(),
                    selectedDate.getMilliseconds(),
                  ),
                  selectedDate,
                ) === 0;
              const today = isToday(v?.[f]);
              const newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                nestedAccess(v, f),
                selectedDate?.getHours() || 0,
                selectedDate?.getMinutes() || 0,
                selectedDate?.getSeconds() || 0,
                selectedDate?.getMilliseconds() || 0,
              );
              return (
                <Col className={css.cell} key={i} span={24 / 7}>
                  {nestedAccess(v, f) ? (
                    props.cellRender?.(newDate, f) || (
                      <Button
                        disabled={props.disabledDate?.(newDate)}
                        flat={!today && !isSelectedDate}
                        shape="circle"
                        outline={today}
                        primary={today || isSelectedDate || false}
                        onClick={() => {
                          return !props.disabledDate?.(newDate) && props.onClick && props.onClick(newDate);
                        }}
                      >
                        {v?.[f]}
                      </Button>
                    )
                  ) : (
                    <div />
                  )}
                  {props.calendarEvents && <div className={css.dateContent}>{calendarEvent(v?.[f], css)}</div>}
                </Col>
              );
            });
          })}
        </Row>
      </CardBody>
    </Card>
  );
};

export enum weeksEnum {
  'MONDAY' = 'MONDAY',
  'TUESDAY' = 'TUESDAY',
  'WEDNESDAY' = 'WEDNESDAY',
  'THURSDAY' = 'THURSDAY',
  'FRIDAY' = 'FRIDAY',
  'SATURDAY' = 'SATURDAY',
  'SUNDAY' = 'SUNDAY',
}

export const weeks = [
  weeksEnum.SUNDAY,
  weeksEnum.MONDAY,
  weeksEnum.TUESDAY,
  weeksEnum.WEDNESDAY,
  weeksEnum.THURSDAY,
  weeksEnum.FRIDAY,
  weeksEnum.SATURDAY,
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface State {
  date: Date;
  dateObj: Record<weeksEnum, number>[];
}

export interface CalendarProps {
  /**
   * Set Calendar Initial Date
   */
  date?: Date | Date;

  /**
   * Updae Rendering of date cell
   */
  cellRender?: (date: Date, week: weeksEnum) => React.ReactNode;

  /**
   * Events to show on calendar
   */
  calendarEvents?: {
    startDate: Date;
    endDate: Date;
    eventName: string;
    color?: string;
  }[];

  elevation?: number;
  onClick?: (date: Date) => void;
  disabledDate?: (date: Date) => boolean;
}

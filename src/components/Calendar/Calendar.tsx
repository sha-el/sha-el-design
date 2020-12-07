import * as React from 'react';
import { stylesheet } from 'typestyle';
import { getDate, getMonth, getDay, getDaysInMonth, getYear, compareDesc } from 'date-fns';
import { nestedAccess, arrayBetween } from './../../helpers';
import { Row, Col } from './../../index';
import { Card, CardBody } from '../Card';
import { color } from 'csx';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { Menu, MenuItem } from '../Menu';

export class Calendar extends React.Component<CalendarProps, State> {
  static defaultProps = {
    date: new Date(),
    disabledDate: () => false,
    elevation: 0,
  };

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      date: this.initialDate(),
      dateObj: this.dateObj(),
    };
  }

  initialDate = (date = this.props.date) => {
    if (!date) {
      return [getYear(new Date()), getMonth(new Date()), getDate(new Date())] as DateTupple;
    }
    if (Array.isArray(date)) {
      return date;
    }
    return [getYear(date), getMonth(date), getDate(date)] as DateTupple;
  };

  dateObj = (dateTupple = this.props.date) => {
    const [year, month, date] = this.initialDate(dateTupple);
    const dateObj: Record<weeksEnum, number>[] = [];
    let monthStart = 1;
    for (let i = 0; i < 6; i++) {
      const obj: Record<weeksEnum, number> = {} as Record<weeksEnum, number>;
      for (let j = getDay(new Date(year, month, monthStart)); j < 7; j++) {
        if (monthStart > getDaysInMonth(new Date(year, month, date))) {
          break;
        }
        obj[weeks[j]] = monthStart;
        monthStart++;
      }
      dateObj.push(obj);
    }
    return dateObj;
  };

  today = (date: number): boolean => {
    const {
      date: [year, month],
    } = this.state;
    if (getYear(new Date()) === year && getMonth(new Date()) === month && getDate(new Date()) === date) {
      return true;
    }
    return false;
  };

  monthChange = (month: string) => {
    this.setState({ date: [this.state.date[0], months.indexOf(month), this.state.date[2]] }, () =>
      this.setState({ dateObj: this.dateObj(this.state.date) }),
    );
  };

  yearChange = (year: number) => {
    this.setState({ date: [year, this.state.date[1], this.state.date[1]] }, () =>
      this.setState({ dateObj: this.dateObj(this.state.date) }),
    );
  };

  calendarEvent = (day: number) => {
    if (!day) {
      return;
    }
    const { callendarEvents } = this.props;
    const {
      date: [year, month, __],
    } = this.state;
    if (!callendarEvents) {
      return;
    }

    const style = this.css();

    return callendarEvents.map((v) => {
      const [startDate, endDate] = [this.initialDate(v.startDate), this.initialDate(v.endDate)];
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
        compareDesc(new Date(...startDate), new Date(year, month, day)) === 1 &&
        compareDesc(new Date(year, month, day), new Date(...endDate)) === 1
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

  toDate = (date: Date | DateTupple | null) => {
    if (!date) {
      return null;
    }
    if (Array.isArray(date)) {
      return new Date(...date);
    }

    return date;
  };

  render() {
    const style = this.css();
    const { dateObj, date } = this.state;
    return (
      <Card elevation={this.props.elevation}>
        <CardBody>
          <Row gutter={[0, '5px']} justifyContent="flex-end">
            <Col flex="0 1 auto">
              <Menu
                height="300px"
                trigger="onHover"
                anchor={
                  <Button primary displayBlock flat>
                    {months[date[1]]}
                  </Button>
                }
              >
                {months.map((v) => (
                  <MenuItem active={v === months[date[1]]} onClick={() => this.monthChange(v)} key={v}>
                    {v}
                  </MenuItem>
                ))}
              </Menu>
            </Col>
            <Col flex="0 1 auto">
              <Menu
                height="300px"
                trigger="onHover"
                anchor={
                  <Button primary displayBlock flat>
                    {date[0]}
                  </Button>
                }
              >
                {arrayBetween(1980, 2030).map((v) => (
                  <MenuItem active={v === date[0]} onClick={() => this.yearChange(v)} key={v}>
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
            {dateObj.map((v) => {
              return weeks.map((f, i) => {
                const selectedDate = this.toDate(this.props.date || null);
                const isSelectedDate =
                  selectedDate && compareDesc(new Date(date[0], date[1], nestedAccess(v, f)), selectedDate) === 0;
                const today = this.today(v?.[f]);
                return (
                  <Col className={style.cell} key={i} span={24 / 7}>
                    {nestedAccess(v, f) ? (
                      this.props.cellRender?.([date?.[0], date?.[1], v?.[f]], f) || (
                        <Button
                          disabled={this.props.disabledDate?.([date[0], date[1], v?.[f]])}
                          flat={!today && !isSelectedDate}
                          shape="circle"
                          outline={today}
                          primary={today || isSelectedDate || false}
                          onClick={() =>
                            !this.props.disabledDate?.([date?.[0], date?.[1], v?.[f]]) &&
                            this.props.onClick &&
                            this.props.onClick([date?.[0], date?.[1], nestedAccess(v, f)] as DateTupple)
                          }
                        >
                          {v?.[f]}
                        </Button>
                      )
                    ) : (
                      <div />
                    )}
                    {this.props.callendarEvents && (
                      <div className={style.dateContent}>{this.calendarEvent(v?.[f])}</div>
                    )}
                  </Col>
                );
              });
            })}
          </Row>
        </CardBody>
      </Card>
    );
  }

  css = () => {
    return stylesheet({
      dateContent: {
        position: 'static',
        width: '110%',
        height: '0',
        textAlign: 'left',
        paddingBottom: '25%',
        boxSizing: 'border-box',
      },
      cell: {
        border: '1px solid rgba(0,0,0,0.1)',
        color: '#555',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0',
        cursor: 'pointer',
      },
      badge: {
        height: '10px',
        minWidth: '100%',
        cursor: 'pointer',
        margin: '2px 0',
      },
    });
  };
}

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
  date: DateTupple;
  dateObj: {
    [key in weeksEnum]: number;
  }[];
}

export interface CalendarProps {
  /**
   * Set Calendar Initial Date
   * DateTupple: [year, month, day]
   */
  date?: Date | DateTupple;

  /**
   * Updae Rendering of date cell
   */
  cellRender?: (date: DateTupple, week: weeksEnum) => React.ReactNode;

  /**
   * Events to show on calendar
   */
  callendarEvents?: {
    startDate: DateTupple;
    endDate: DateTupple;
    eventName: string;
    color?: string;
  }[];

  elevation?: number;
  onClick?: (date: DateTupple) => void;
  disabledDate?: (date: DateTupple) => boolean;
}

export type DateTupple = [
  /**
   * Year
   */
  number,
  /**
   * Month
   */
  number,
  /**
   * Day
   */
  number,
];

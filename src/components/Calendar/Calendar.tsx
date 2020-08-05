import * as React from "react";
import { stylesheet, style as typeStyle, classes } from "typestyle";
import {
  getDate,
  getMonth,
  getDay,
  getDaysInMonth,
  getYear,
  compareDesc,
} from "date-fns";
import { nestedAccess, arrayBetween, getColor } from "./../../helpers";
import { disabledColor } from "../../helpers/color";
import { AutoComplete } from "../AutoComplete";
import { Row, Col } from "./../../index";
import { Card, CardBody } from "../Card";
import { color } from "csx";
import RCTooltip from "rc-tooltip";
import { ThemeConsumer, Theme } from "../Theme/Theme";

export class Calendar extends React.Component<CalendarProps, State> {
  static defaultProps = {
    date: new Date(),
    cellRender: ([, , date]) => date,
    disabledDate: (_) => false,
  };

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      date: this.initialDate(),
      dateObj: this.dateObj(),
    };
  }

  initialDate = (date = this.props.date) => {
    if (Array.isArray(date)) {
      return date;
    }
    return [getYear(date), getMonth(date), getDate(date)] as DateTupple;
  };

  dateObj = (dateTupple = this.props.date) => {
    const [year, month, date] = this.initialDate(dateTupple);
    const dateObj = [];
    let monthStart = 1;
    for (let i = 0; i < 6; i++) {
      const obj = {};
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

  todayStyle = (date: number, primaryColor: string): React.CSSProperties => {
    const {
      date: [year, month],
    } = this.state;
    if (
      getYear(new Date()) === year &&
      getMonth(new Date()) === month &&
      getDate(new Date()) === date
    ) {
      return {
        borderBottom: "2px solid " + primaryColor,
      };
    }
    return {};
  };

  monthChange = (month: string) => {
    this.setState(
      { date: [this.state.date[0], months.indexOf(month), this.state.date[2]] },
      () => this.setState({ dateObj: this.dateObj(this.state.date) })
    );
  };

  yearChange = (year: number) => {
    this.setState(
      { date: [year, this.state.date[1], this.state.date[1]] },
      () => this.setState({ dateObj: this.dateObj(this.state.date) })
    );
  };

  calendarEvent = (day: number) => {
    if (!day) {
      return;
    }

    const { callendarEvents } = this.props;
    const {
      date: [year, month, _],
    } = this.state;

    if (!callendarEvents) {
      return;
    }

    const style = this.css();

    return callendarEvents.map((v, i) => {
      if (
        day === v.startDate[2] &&
        month === v.startDate[1] &&
        year === v.startDate[0]
      ) {
        return (
          <RCTooltip placement="top" trigger={["hover"]} overlay={v.eventName}>
            <div
              className={style.badge}
              style={{
                borderRadius: "4px 0 0 4px",
                background: v.color || "#fcc",
                boxShadow:
                  "0 10px 14px " +
                  color(v.color || "#fcc")
                    .fade(0.4)
                    .toString(),
              }}
            />
          </RCTooltip>
        );
      }

      if (
        compareDesc(new Date(...v.startDate), new Date(year, month, day)) ===
          1 &&
        compareDesc(new Date(year, month, day), new Date(...v.endDate)) === 1
      ) {
        return (
          <RCTooltip placement="top" trigger={["hover"]} overlay={v.eventName}>
            <div
              className={style.badge}
              style={{
                background: v.color || "#fcc",
                boxShadow:
                  "0 10px 14px " +
                  color(v.color || "#fcc")
                    .fade(0.4)
                    .toString(),
              }}
            />
          </RCTooltip>
        );
      }

      if (
        day === v.endDate[2] &&
        month === v.endDate[1] &&
        year === v.endDate[0]
      ) {
        return (
          <RCTooltip placement="top" trigger={["hover"]} overlay={v.eventName}>
            <div
              className={style.badge}
              style={{
                borderRadius: "0 0 4px 4px",
                background: v.color || "#fcc",
                boxShadow:
                  "0 10px 14px " +
                  color(v.color || "#fcc")
                    .fade(0.4)
                    .toString(),
              }}
            />
          </RCTooltip>
        );
      }
    });
  };

  cellDisabledStyle = (disabled: boolean, theme: Theme) =>
    disabled &&
    typeStyle({
      background: disabledColor(theme),
      cursor: "not-allowed",
      color: "#fff",
      $nest: {
        "&:hover": {
          background: disabledColor(theme) + " !important",
        },
      },
    });

  toDate = (date: Date | DateTupple) => {
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
      <ThemeConsumer>
        {(theme) => (
          <Card>
            <CardBody>
              <div>
                <Row>
                  <Col span={12}>
                    <AutoComplete
                      data={() => months}
                      label="Month"
                      value={months[date[1]]}
                      uniqueIdentifier={(e: string) => e}
                      listDisplayProp={(e) => e}
                      onChange={this.monthChange}
                      displayValue={(e: string) => e.toString()}
                      clearable={false}
                    />
                  </Col>
                  <Col span={12}>
                    <AutoComplete
                      data={() => arrayBetween(1980, 2030)}
                      label="Year"
                      value={date[0]}
                      uniqueIdentifier={(e: string) => e}
                      listDisplayProp={(e) => e}
                      onChange={this.yearChange}
                      displayValue={(e) => e}
                      clearable={false}
                    />
                  </Col>
                </Row>
                <Row>
                  {weeks.map((v) => (
                    <Col className={style.weeks} span={24 / 7} key={v}>
                      {v.slice(0, 3)}
                    </Col>
                  ))}
                </Row>
                <Row>
                  {dateObj.map((v, index) => {
                    return weeks.map((f, i) => {
                      const isSelectedDate =
                        compareDesc(
                          new Date(date[0], date[1], nestedAccess(v, f)),
                          this.toDate(this.props.date)
                        ) === 0;

                      return (
                        <Col
                          style={{
                            ...this.todayStyle(nestedAccess(v, f), theme.primary),
                            padding: "0",
                            background:
                              isSelectedDate && theme.primary,
                            color:
                              isSelectedDate &&
                              getColor(theme.primary),
                            boxSizing: "border-box",
                          }}
                          className={classes(
                            style.cell,
                            this.cellDisabledStyle(
                              this.props.disabledDate([
                                date[0],
                                date[1],
                                nestedAccess(v, f),
                              ]),
                              theme
                            )
                          )}
                          key={i}
                          span={24 / 7}
                          onClick={() =>
                            !this.props.disabledDate([
                              date[0],
                              date[1],
                              nestedAccess(v, f),
                            ]) &&
                            this.props.onClick &&
                            this.props.onClick([
                              date[0],
                              date[1],
                              nestedAccess(v, f),
                            ] as DateTupple)
                          }
                        >
                          {(nestedAccess(v, f) &&
                            this.props.cellRender(
                              [date[0], date[1], nestedAccess(v, f)],
                              f
                            )) ||
                            "-"}
                          <div className={style.dateContent}>
                            {this.calendarEvent(nestedAccess(v, f))}
                          </div>
                        </Col>
                      );
                    });
                  })}
                </Row>
              </div>
            </CardBody>
          </Card>
        )}
      </ThemeConsumer>
    );
  }

  css = () => {
    return stylesheet({
      dateContent: {
        position: "static",
        height: "0",
        textAlign: "left",
        paddingBottom: "25%",
        boxSizing: "border-box",
      },
      weeks: {
        textAlign: "right",
        fontWeight: "bold",
        color: "#333",
      },
      cell: {
        borderBottom: "1px solid #eee",
        fontWeight: 400,
        color: "#555",
        textAlign: "right",
        padding: "0",
        borderLeft: "none #e0e0e0 1px solid",
        borderRight: "none #e0e0e0 1px solid",
        cursor: "pointer",

        $nest: {
          "&:hover": {
            background: "#eee",
          },
        },
      },
      badge: {
        height: "5px",
        width: "100%",
        cursor: "pointer",
        marginBottom: "2px",
      },
    });
  };
}

export enum weeksEnum {
  "MONDAY" = "MONDAY",
  "TUESDAY" = "TUESDAY",
  "WEDNESDAY" = "WEDNESDAY",
  "THURSDAY" = "THURSDAY",
  "FRIDAY" = "FRIDAY",
  "SATURDAY" = "SATURDAY",
  "SUNDAY" = "SUNDAY",
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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
  number
];


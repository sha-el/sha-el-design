import * as React from 'react';
import { stylesheet } from 'typestyle';
import * as csstips from 'csstips';
import { getDate, getMonth, getDay, getDaysInMonth, getYear } from 'date-fns';
import { styleEnum } from './../../helpers/constants';
import { nestedAccess, getColor, arrayBetween } from './../../helpers';
import { Theme, ThemeService } from './../../helpers/theme';
import { AutoComplete } from './../../index';
import { Row, Col } from './../../index';

export class Calendar extends React.Component<CalendarProps, State> {
  private readonly theme = new ThemeService();
  static defaultProps = {
    date: new Date(),
    renderFull: ([, , date]) => date,
    renderAppend: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      date: this.initialDate(),
      dateObj: this.dateObj(),
      theme: this.theme.selectedTheme$.getValue(),
    };
  }

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  initialDate = (date = this.props.date) => {
    if (Array.isArray(date)) {
      return date;
    }
    return [getYear(date), getMonth(date), getDate(date)] as DateTupple;
  }

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
  }

  todayStyle = (date: number): React.CSSProperties => {
    const { date: [year, month], theme: { primary } } = this.state;
    if (getYear(new Date()) === year && getMonth(new Date()) === month && getDate(new Date()) === date) {
      return {
        borderTop: '1px solid ' + primary,
      };
    }
    return {};
  }

  monthChange = (month: string) => {
    this.setState(
      { date: [this.state.date[0], months.indexOf(month), this.state.date[2]] },
      () => this.setState({ dateObj: this.dateObj(this.state.date) }),
    );
  }

  yearChange = (year: number) => {
    this.setState(
      { date: [year, this.state.date[1], this.state.date[1]] },
      () => this.setState({ dateObj: this.dateObj(this.state.date) }),
    );
  }

  render() {
    const style = this.css();
    const { dateObj, date } = this.state;
    return (
      <div className={style.calendar}>
        <Row>
          <Col span={12}>
            <AutoComplete
              isSelect
              data={months}
              inputProps={{ label: 'Month' }}
              value={months[date[1]]}
              uniqueIdentifier={(e) => e}
              displayProp={(e) => e.toString()}
              onChange={this.monthChange}
            />
          </Col>
          <Col span={12}>
            <AutoComplete
              isSelect
              data={arrayBetween(1980, 2030)}
              inputProps={{ label: 'Year' }}
              value={date[0]}
              uniqueIdentifier={(e) => e}
              displayProp={(e) => e}
              onChange={this.yearChange}
            />
          </Col>
        </Row>
        <ul className={style.weeks}>
          {weeks.map(v => <li key={v}>{v.slice(0, 3)}</li>)}
        </ul>
        {dateObj.map((v, index) => {
          return (
            <ul key={index} className={style.dates}>
              {weeks.map((f, i) => (
                <li
                  style={this.todayStyle(nestedAccess(v, f))}
                  key={i}
                >
                  {nestedAccess(v, f) && this.props.renderFull([date[0], date[1], nestedAccess(v, f)]) || '-'}
                  <div>{this.props.renderAppend([date[0], date[1], nestedAccess(v, f)])}</div>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    );
  }

  css = () => {
    return stylesheet({
      calendar: {
        padding: '10px',
      },
      weeks: {
        width: '100%',
        borderBottom: '1px solid ' + styleEnum.borderColor,
        padding: '0',
        margin: '0',
        background: styleEnum.headerBgColor,
        ...csstips.inlineRoot,
        $nest: {
          li: {
            ...csstips.flex,
            listStyle: 'none',
            textAlign: 'right',
          },
        },
      },
      dates: {
        width: '100%',
        padding: '0',
        margin: '0',
        $nest: {
          li: {
            display: 'inline-block',
            width: 'calc(100% / 7)',
            listStyle: 'none',
            textAlign: 'right',
            borderTop: '1px solid ' + styleEnum.borderColor,
            boxSizing: 'border-box',
            height: '100px',
            cursor: 'pointer',
            $nest: {
              '&:hover': {
                background: this.state.theme.primary,
                color: getColor(this.state.theme.primary),
              },
            },
          },
        },
      },
    });
  }
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

export const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

interface State {
  date: DateTupple;
  dateObj: {
    [key in weeksEnum]: number;
  }[];
  theme: Theme;
}

export interface CalendarProps {
  date?: Date | DateTupple;
  renderFull?: (date: DateTupple) => React.ReactNode;
  renderAppend?: (date: DateTupple) => React.ReactNode;
}

export type DateTupple = [number /* Year */, number /* Month */, number /* Date */];
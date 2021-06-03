import React from 'react';
import { TimePicker } from '../../../src';

import '@testing-library/jest-dom';
import { fireEvent, render, act } from '@testing-library/react';

const CreateTimePicker = (props: { use12Hour?: boolean; disabled?: boolean; boderless?: boolean; time?: Date }) => {
  const [time, updateTime] = React.useState<Date>(props.time);
  return (
    <>
      <TimePicker
        label="Time"
        time={time}
        onChange={(e) => {
          return updateTime(e);
        }}
        use12Hour={props.use12Hour}
        disabled={props.disabled}
        borderless={props.boderless}
      />
      <div style={{ paddingBottom: '500px' }} />
    </>
  );
};

const compareTime = (num: number, value: string) => new Date(num).toTimeString().split(' ')[0] === value;
const compare12HourTime = (num: number, value: string) => {
  const time = new Date(num).toLocaleTimeString().split(':');
  time[0] = time[0].length === 1 && '0' + time[0];
  const newTime = time.join(':').toString();

  return newTime === value;
};

describe('TimePicker', () => {
  it('Should render a timepicker component', () => {
    render(<CreateTimePicker />);

    const popoverElement = document.querySelector('.popover-element');
    expect(popoverElement).toHaveStyle(`
      display: block;
    `);

    const timePickerInput = document.querySelector('.sha-el-input');

    expect(timePickerInput.querySelector('label').innerHTML).toBe('Time ');
    expect(timePickerInput.querySelector('input').value).toBe('00:00:00');

    const timePickerbutton = timePickerInput.querySelector('button');
    expect(timePickerbutton.querySelector('svg').innerHTML).toContain(
      // Path for MdTimer icon
      'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
    );
  });

  it('Should render a 12 hour format timepicker component', () => {
    render(<CreateTimePicker use12Hour />);

    const timePickerInput = document.querySelector('.sha-el-input');

    expect(timePickerInput.querySelector('label').innerHTML).toBe('Time ');
    expect(timePickerInput.querySelector('input').value).toBe('12:00:00 AM');
  });

  it('Should open timepicker', () => {
    render(<CreateTimePicker />);

    let tooltip = document.querySelector('.rc-tooltip');
    expect(tooltip).toBeNull();

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    tooltip = document.querySelector('.rc-tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip).toHaveStyle(`
      display: block;
    `);

    expect(document.querySelectorAll('.rc-tooltip-arrow')[0]).toHaveStyle(`
      display: none;
    `);
    expect(document.querySelectorAll('.rc-tooltip-arrow')[1]).toHaveStyle(`
      display: none;
    `);

    const timePickerContainer = tooltip.querySelector('.sha-el-row').parentElement;
    expect(timePickerContainer).toHaveStyle(`
      background: #ffffff;
    `);

    const hourColumn = timePickerContainer.querySelector('.hour-column');
    expect(hourColumn).toHaveStyle(`
      padding-left: 0px;
      padding-right: 0px;
    `);
    expect(hourColumn).toHaveStyle(`
      border-right: 1px solid #eee;
    `);
    expect(hourColumn).toHaveStyle(`
      max-height: 300px;
      overflow-y: hidden;
      cursor: pointer;
      min-width: 50px;
      scroll-behavior: smooth;
    `);

    const minColumn = timePickerContainer.querySelector('.min-column');
    expect(minColumn).toHaveStyle(`
      padding-left: 0px;
      padding-right: 0px;
    `);
    expect(minColumn).toHaveStyle(`
      border-right: 1px solid #eee;
    `);
    expect(minColumn).toHaveStyle(`
      max-height: 300px;
      overflow-y: hidden;
      cursor: pointer;
      min-width: 50px;
      scroll-behavior: smooth;
    `);

    const secColumn = timePickerContainer.querySelector('.sec-column');
    expect(secColumn).toHaveStyle(`
      padding-left: 0px;
      padding-right: 0px;
    `);
    expect(secColumn).toHaveStyle(`
      border-right: 1px solid #eee;
    `);
    expect(secColumn).toHaveStyle(`
      max-height: 300px;
      overflow-y: hidden;
      cursor: pointer;
      min-width: 50px;
      scroll-behavior: smooth;
    `);

    const hours = hourColumn.querySelectorAll('p');
    expect(hours.length).toBe(24);
    expect(hours[0].innerHTML).toBe('0');
    expect(hours[23].innerHTML).toBe('23');
    expect(hours[0]).toHaveStyle(`
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      margin: 0;
      padding: 5px 15px;
      background: #536DFE;
    `);

    const minutes = minColumn.querySelectorAll('p');
    expect(minutes.length).toBe(60);
    expect(minutes[0].innerHTML).toBe('0');
    expect(minutes[59].innerHTML).toBe('59');
    expect(minutes[0]).toHaveStyle(`
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      margin: 0;
      padding: 5px 15px;
      background: #536DFE;
    `);

    const seconds = secColumn.querySelectorAll('p');
    expect(seconds.length).toBe(60);
    expect(seconds[0].innerHTML).toBe('0');
    expect(seconds[59].innerHTML).toBe('59');
    expect(seconds[0]).toHaveStyle(`
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      margin: 0;
      padding: 5px 15px;
      background: #536DFE;
    `);

    const now = tooltip.querySelector('button');
    expect(now.innerHTML).toBe('<span>Now</span>');
  });

  it('Should open a 12 hour format timepicker', () => {
    render(<CreateTimePicker use12Hour />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row').parentElement;

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    expect(hours.length).toBe(12);
    expect(hours[0].innerHTML).toBe('12');
    expect(hours[11].innerHTML).toBe('11');

    const twelveHourElements = timePickerContainer.querySelector('.am-column').querySelectorAll('p');
    expect(twelveHourElements.length).toBe(2);
    expect(twelveHourElements[0].innerHTML).toBe('AM');
    expect(twelveHourElements[0]).toHaveStyle(`
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      margin: 0;
      padding: 5px 15px;
      background: #536DFE;
    `);
    expect(twelveHourElements[1].innerHTML).toBe('PM');
    expect(twelveHourElements[1]).toHaveStyle(`
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      margin: 0;
      padding: 5px 15px;
    `);
  });

  it('Should show current time when clicked on now button', () => {
    render(<CreateTimePicker />);

    const timePickerInput = document.querySelector('.sha-el-input');
    expect(timePickerInput.querySelector('input').value).toBe('00:00:00');

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const tooltip = document.querySelector('.rc-tooltip');
    let date: Date;
    act(() => {
      fireEvent.click(tooltip.querySelector('button'));
      date = new Date();
    });

    const value = timePickerInput.querySelector('input').value;
    const isCurrentTime =
      compareTime(date.setSeconds(date.getSeconds()), value) ||
      compareTime(date.setSeconds(date.getSeconds() - 1), value) ||
      compareTime(date.setSeconds(date.getSeconds() - 1), value);

    expect(isCurrentTime).toBeTruthy();

    const currentTime = date
      .toTimeString()
      .split(' ')[0]
      .split(':')
      .map((v) => Number(v));

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row');

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    expect(hours[currentTime[0]]).toHaveStyle(`
      background: #536DFE;
    `);

    const minutes = timePickerContainer.querySelector('.min-column').querySelectorAll('p');
    expect(minutes[currentTime[1]]).toHaveStyle(`
      background: #536DFE;
    `);

    const seconds = timePickerContainer.querySelector('.sec-column').querySelectorAll('p');
    expect(seconds[currentTime[2]]).toHaveStyle(`
      background: #536DFE;
    `);
  });

  it('Should show current time when clicked on now button in 12 hour format', () => {
    render(<CreateTimePicker use12Hour />);

    const timePickerInput = document.querySelector('.sha-el-input');
    expect(timePickerInput.querySelector('input').value).toBe('12:00:00 AM');

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const tooltip = document.querySelector('.rc-tooltip');
    let date: Date;
    act(() => {
      fireEvent.click(tooltip.querySelector('button'));
      date = new Date();
    });

    const value = timePickerInput.querySelector('input').value;
    const isCurrentTime =
      compare12HourTime(date.setSeconds(date.getSeconds()), value) ||
      compare12HourTime(date.setSeconds(date.getSeconds() - 1), value) ||
      compare12HourTime(date.setSeconds(date.getSeconds() - 1), value);

    expect(isCurrentTime).toBeTruthy();

    const currentTime = date.toLocaleTimeString().split(' ')[0].split(':');
    currentTime.push(date.toLocaleTimeString().split(' ')[1]);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row');

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    expect(hours[Number(currentTime[0] === '12' ? '0' : currentTime[0])]).toHaveStyle(`
      background: #536DFE;
    `);

    const minutes = timePickerContainer.querySelector('.min-column').querySelectorAll('p');
    expect(minutes[Number(currentTime[1])]).toHaveStyle(`
      background: #536DFE;
    `);

    const seconds = timePickerContainer.querySelector('.sec-column').querySelectorAll('p');
    expect(seconds[Number(currentTime[2])]).toHaveStyle(`
      background: #536DFE;
    `);

    const period = timePickerContainer.querySelector('.am-column').querySelectorAll('p');
    const index = currentTime[3] === 'AM' ? 0 : 1;
    expect(period[index]).toHaveStyle(`
      background: #536DFE;
    `);
  });

  it('Should re-render on time change', () => {
    render(<CreateTimePicker />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row');

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(hours[22]);
    });
    expect(hours[22]).toHaveStyle(`
      background: #536DFE;
    `);

    const minutes = timePickerContainer.querySelector('.min-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(minutes[45]);
    });
    expect(minutes[45]).toHaveStyle(`
      background: #536DFE;
    `);

    const seconds = timePickerContainer.querySelector('.sec-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(seconds[49]);
    });
    expect(seconds[49]).toHaveStyle(`
      background: #536DFE;
    `);

    expect(document.querySelector('input').value).toBe('22:45:49');
  });

  it('Should re-render 12 hour format timeline on time change', () => {
    render(<CreateTimePicker use12Hour />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row');

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(hours[9]);
    });
    expect(hours[9]).toHaveStyle(`
      background: #536DFE;
    `);

    const minutes = timePickerContainer.querySelector('.min-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(minutes[45]);
    });
    expect(minutes[45]).toHaveStyle(`
      background: #536DFE;
    `);

    const seconds = timePickerContainer.querySelector('.sec-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(seconds[0]);
    });
    expect(seconds[0]).toHaveStyle(`
      background: #536DFE;
    `);

    const period = timePickerContainer.querySelector('.am-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(period[1]);
    });
    expect(period[1]).toHaveStyle(`
      background: #536DFE;
    `);

    expect(document.querySelector('input').value).toBe('09:45:00 PM');
  });

  it('Should check click on AM', () => {
    render(<CreateTimePicker use12Hour time={new Date(2021, 4, 25, 20)} />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row');
    const period = timePickerContainer.querySelector('.am-column').querySelectorAll('p');
    expect(period[0]).not.toHaveStyle(`
      background: #536DFE;
    `);
    act(() => {
      fireEvent.click(period[0]);
    });
    expect(period[0]).toHaveStyle(`
      background: #536DFE;
    `);
  });

  it('Should render timepicker with time prop', () => {
    render(<CreateTimePicker time={new Date(2007, 6, 7, 11, 11, 11)} />);

    expect(document.querySelector('input').value).toBe('11:11:11');
  });

  it('Should render a 12 hour format timepicker with time prop', () => {
    render(<CreateTimePicker use12Hour time={new Date(2007, 6, 7, 23, 11, 11)} />);

    expect(document.querySelector('input').value).toBe('11:11:11 PM');
  });

  it('Should re-render on input value change', () => {
    render(<CreateTimePicker />);

    act(() => {
      fireEvent.click(document.querySelector('.sha-el-input'));
    });

    const timePickerInput = document.querySelector('input');
    act(() => {
      fireEvent.change(timePickerInput, { target: { value: '14:15:16' } });
    });

    act(() => {
      fireEvent.blur(document.querySelector('.sha-el-input'));
    });

    expect(timePickerInput.value).toBe('14:15:16');

    act(() => {
      fireEvent.click(timePickerInput);
    });

    const timePickerContainer = document.querySelector('.rc-tooltip').querySelector('.sha-el-row');

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(hours[14]);
    });
    expect(hours[14]).toHaveStyle(`
      background: #536DFE;
    `);

    const minutes = timePickerContainer.querySelector('.min-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(minutes[15]);
    });
    expect(minutes[15]).toHaveStyle(`
      background: #536DFE;
    `);

    const seconds = timePickerContainer.querySelector('.sec-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(seconds[16]);
    });
    expect(seconds[16]).toHaveStyle(`
      background: #536DFE;
    `);
  });

  it('Should re-render timepicker on enter key press', () => {
    render(<CreateTimePicker />);

    act(() => {
      fireEvent.click(document.querySelector('.sha-el-input'));
    });

    const timePickerInput = document.querySelector('input');

    act(() => {
      fireEvent.change(document.querySelector('input'), { target: { value: '04:15:16' } });
    });

    act(() => {
      fireEvent.keyDown(document.querySelector('.sha-el-input'), { key: 'Enter', Code: 'Enter' });
    });
    expect(timePickerInput.value).toBe('04:15:16');
  });

  it('Should re-render 12 hour format timepicker on enter key press', () => {
    render(<CreateTimePicker use12Hour />);

    const timePickerInput = document.querySelector('input');

    act(() => {
      fireEvent.click(document.querySelector('.sha-el-input'));
    });

    act(() => {
      fireEvent.change(document.querySelector('input'), { target: { value: '02:15:16 AM' } });
    });

    act(() => {
      fireEvent.keyDown(document.querySelector('.sha-el-input'), { key: 'Enter', Code: 'Enter' });
    });
    expect(timePickerInput.value).toBe('02:15:16 AM');
  });

  it('Should open a timepicker on arrow down', () => {
    render(<CreateTimePicker />);

    let tooltip = document.querySelector('.rc-tooltip');
    expect(tooltip).toBeNull();

    act(() => {
      fireEvent.keyDown(document.querySelector('.sha-el-input'), { key: 'ArrowDown', code: 'ArrowDown' });
    });

    tooltip = document.querySelector('.rc-tooltip');
    expect(tooltip).toBeDefined();
  });

  it('Should render a disabled timepicker', () => {
    render(<CreateTimePicker disabled />);

    const input = document.querySelector('input');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveStyle(`
      cursor: not-allowed;
    `);

    const button = document.querySelector('button');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveStyle(`
      cursor: not-allowed;
    `);
  });
});

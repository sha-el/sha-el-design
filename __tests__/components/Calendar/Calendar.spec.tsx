import React from 'react';
import { Calendar } from '../../../src';

import '@testing-library/jest-dom';
import { fireEvent, render, act, screen } from '@testing-library/react';
import { months, weeksEnum } from '../../../src/components/Calendar/Calendar';

describe('Calendar', () => {
  it('Should check cell styles', async () => {
    await act(async () => {
      render(<Calendar />);
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');

    expect(datesArray[0]).toHaveStyle(`
      border: 1px solid rgba(0,0,0,0.1);
      color: #555;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 0px;
      cursor: pointer;
    `);
  });

  it('Should change month of calendar', async () => {
    await act(async () => {
      render(<Calendar />);
    });

    const currentMonth = months[new Date().getMonth()];

    let monthMenu = document.querySelector('.sha-el-row').querySelector('.sha-el-col').querySelector('button');
    expect(monthMenu.innerHTML).toBe(`<span>${currentMonth}</span>`);

    act(() => {
      fireEvent.click(monthMenu);
    });

    let monthArray = document.querySelector('ul').querySelectorAll('li');
    expect(monthArray.length).toBe(12);
    expect(monthArray[new Date().getMonth()]).toHaveStyle(`
      background: rgb(83, 109, 254);
      color: rgb(255, 255, 255);
    `);

    act(() => {
      fireEvent.click(monthArray[6]);
    });

    monthMenu = document.querySelector('.sha-el-row').querySelector('.sha-el-col').querySelector('button');
    expect(monthMenu.innerHTML).toBe(`<span>July</span>`);

    monthArray = document.querySelector('ul').querySelectorAll('li');
    expect(monthArray[6]).toHaveStyle(`
      background: rgb(83, 109, 254);
      color: rgb(255, 255, 255);
    `);
  });

  it('Should change year of calendar', async () => {
    await act(async () => {
      render(<Calendar />);
    });

    const currentYear = new Date().getFullYear();

    let yearMenu = document.querySelector('.sha-el-row').querySelectorAll('.sha-el-col')[1].querySelector('button');
    expect(yearMenu.innerHTML).toBe(`<span>${currentYear}</span>`);

    act(() => {
      fireEvent.click(yearMenu);
    });

    let yearArray = document.querySelectorAll('ul')[1].querySelectorAll('li');

    expect(yearArray[currentYear - 1980]).toHaveStyle(`
      background: rgb(83, 109, 254);
      color: rgb(255, 255, 255);
    `);

    act(() => {
      fireEvent.click(yearArray[1993 - 1980]);
    });

    yearMenu = document.querySelector('.sha-el-row').querySelectorAll('.sha-el-col')[1].querySelector('button');
    expect(yearMenu.innerHTML).toBe(`<span>1993</span>`);

    yearArray = document.querySelectorAll('ul')[1].querySelectorAll('li');
    expect(yearArray[1993 - 1980]).toHaveStyle(`
      background: rgb(83, 109, 254);
      color: rgb(255, 255, 255);
    `);
  });

  it('Should check weeks of calendar', async () => {
    await act(async () => {
      render(<Calendar />);
    });

    const weeks = document.querySelectorAll('.sha-el-row')[1].querySelectorAll('.sha-el-col');
    expect(weeks.length).toBe(7);
  });

  it('Should render correct date week name', async () => {
    await act(async () => {
      render(<Calendar date={new Date(2007, 6, 7)} />);
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    expect(datesArray[0].querySelector('button').innerHTML).toBe('<span>1</span>'); // 1 July 2007 -> Sunday i.e 1st Day of array.
    expect(datesArray[30].querySelector('button').innerHTML).toBe('<span>31</span>'); // July has 31 days.
    expect(datesArray[6].querySelector('button')).toHaveStyle(`
      color: #ffffff;
      background: #536DFE;
    `);
  });

  it(`Should check today's date style`, async () => {
    await act(async () => {
      render(<Calendar />);
    });

    expect(screen.getByText(`${new Date().getDate()}`).parentNode).toHaveStyle(`
        box-shadow: none;
        text-align: center;
        color: #536DFE;
        border: 1px solid #536DFE;
        border-radius: 50%;
    `);
  });

  it('Should change date background on click', async () => {
    const fn = jest.fn();
    await act(async () => {
      render(<Calendar date={new Date(2007, 6, 7)} onClick={fn} />);
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');

    act(() => {
      fireEvent.click(datesArray[9].querySelector('button'));
    });
    expect(fn).toBeCalledTimes(1);
    expect(datesArray[9]).toHaveStyle(`
      color: #555555;
    `);
  });

  it('Should re-render on month change', async () => {
    await act(async () => {
      render(<Calendar date={new Date(2007, 6, 7)} />);
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    expect(datesArray[0].querySelector('button').innerHTML).toBe('<span>1</span>');

    const monthMenu = document.querySelector('.sha-el-row').querySelector('.sha-el-col').querySelector('button');
    act(() => {
      fireEvent.click(monthMenu);
    });
    const monthArray = document.querySelector('ul').querySelectorAll('li');
    act(() => {
      fireEvent.click(monthArray[11]);
    });

    expect(datesArray[6].querySelector('button').innerHTML).toBe('<span>1</span>');
  });

  it('Should re-render on year change', async () => {
    await act(async () => {
      render(<Calendar date={new Date(2007, 6, 7)} />);
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    expect(datesArray[0].querySelector('button').innerHTML).toBe('<span>1</span>');

    const yearMenu = document.querySelector('.sha-el-row').querySelectorAll('.sha-el-col')[1].querySelector('button');
    act(() => {
      fireEvent.click(yearMenu);
    });
    const yearArray = document.querySelectorAll('ul')[1].querySelectorAll('li');
    act(() => {
      fireEvent.click(yearArray[2025 - 1980]);
    });

    expect(datesArray[2].querySelector('button').innerHTML).toBe('<span>1</span>');
  });

  it('Should render a calendar with cellRender prop', async () => {
    await act(async () => {
      render(
        <Calendar
          date={new Date(2007, 6, 7)}
          cellRender={(date: Date, week: weeksEnum) => {
            if (week === weeksEnum.SUNDAY) {
              return <div style={{ background: 'red', color: 'white', width: '100%' }}>{date.getDate()}</div>;
            }
          }}
        />,
      );
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    for (let i = 0; i < 31; i += 7) {
      expect(datesArray[i].querySelector('div')).toHaveStyle(`
        background: red;
        color: white;
        width: 100%;
      `);
    }
  });

  it('Should render a calendar with disabled dates', async () => {
    const fn = jest.fn();
    await act(async () => {
      render(<Calendar date={new Date(2007, 6, 7)} onClick={fn} disabledDate={(date: Date) => date.getDay() === 3} />);
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    for (let i = 3; i < 31; i += 7) {
      act(() => {
        fireEvent.click(datesArray[i].querySelector('button'));
      });

      expect(fn).toBeCalledTimes(0);
      expect(datesArray[i].querySelector('button')).toHaveStyle(`
        background: transparent;
        cursor: not-allowed;
        color: rgba(0, 0, 0, 0.20);
      `);
    }
  });

  it('Should render a calendar with events', async () => {
    await act(async () => {
      render(
        <Calendar
          date={new Date(2007, 6, 7)}
          calendarEvents={[
            {
              startDate: new Date(2007, 6, 5),
              endDate: new Date(2007, 6, 6),
              eventName: 'Event 1',
              color: '#fcf',
            },
            {
              startDate: new Date(2007, 6, 6),
              endDate: new Date(2007, 6, 7),
              eventName: 'Event 2',
            },
          ]}
        />,
      );
    });

    act(() => {
      jest.runAllTimers();
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');

    const event1 = datesArray[4].querySelector('div').querySelector('div');
    expect(event1).toHaveStyle(`
      background: rgb(255, 204, 255);
      box-shadow: 0 10px 14px rgba(255, 204, 255, 0.6);
      height: 10px;
      min-width: 100%;
      cursor: pointer;
      margin: 2px 0;
    `);

    const event2 = datesArray[6].querySelector('div').querySelector('div');
    expect(event2).toHaveStyle(`
      background: rgb(255, 204, 204);
      box-shadow: 0 10px 14px rgba(255, 204, 204, 0.6);
      height: 10px;
      min-width: 100%;
      cursor: pointer;
      margin: 2px 0;
    `);

    const multipleEvent = datesArray[5].querySelector('div').querySelectorAll('div');
    expect(multipleEvent[0]).toHaveStyle(`
      background: rgb(255, 204, 255);
      box-shadow: 0 10px 14px rgba(255, 204, 255, 0.6);
      height: 10px;
      min-width: 100%;
      cursor: pointer;
      margin: 2px 0;
    `);
    expect(multipleEvent[1]).toHaveStyle(`
      background: rgb(255, 204, 204);
      box-shadow: 0 10px 14px rgba(255, 204, 204, 0.6);
      height: 10px;
      min-width: 100%;
      cursor: pointer;
      margin: 2px 0;
    `);
  });

  it('Should render tooltip when hover on an event', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(
        <Calendar
          date={new Date(2007, 6, 7)}
          calendarEvents={[
            {
              startDate: new Date(2007, 6, 4),
              endDate: new Date(2007, 6, 8),
              eventName: 'Event 1',
              color: '#fcf',
            },
          ]}
        />,
      );
    });

    act(() => {
      jest.runAllTimers();
    });

    const datesArray = document.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');

    for (let i = 3; i < 8; i++) {
      await act(async () => {
        fireEvent.mouseOver(datesArray[i].querySelector('div').querySelector('div'));
      });

      act(() => {
        jest.runAllTimers();
      });

      const eventTooltip = document.querySelectorAll('.sha-el-tooltip')[2];
      expect(eventTooltip.innerHTML).toContain('Event 1');
    }
  });
});

import React from 'react';
import { DatePicker } from '../../../src';

import MockDate from 'mockdate';
import '@testing-library/jest-dom';
import { fireEvent, render, act, screen } from '@testing-library/react';

const CreateDatePicker = (props: { date?: Date; withTimePicker?: Record<string, unknown> }) => {
  const [date, updateDate] = React.useState<Date>(props.date);
  return (
    <DatePicker label="Enter Date" date={date} onChange={(e) => updateDate(e)} timePickerProps={props.withTimePicker} />
  );
};

describe('DatePicker', () => {
  it('Should render a datepicker component', () => {
    render(<CreateDatePicker />);

    const popoverElement = document.querySelector('.popover-element');
    expect(popoverElement).toHaveStyle(`
      display: block;
    `);

    const datePickerInput = popoverElement.querySelector('.sha-el-input');

    expect(datePickerInput.querySelector('label').innerHTML).toBe('Enter Date ');

    const datePickerbutton = datePickerInput.querySelector('button');
    expect(datePickerbutton.querySelector('svg').innerHTML).toContain(
      // Path for MdTimer icon
      'M368.005 272h-96v96h96v-96zm-32-208v32h-160V64h-48v32h-24.01c-22.002 0-40 17.998-40 40v272c0 22.002 17.998 40 40 40h304.01c22.002 0 40-17.998 40-40V136c0-22.002-17.998-40-40-40h-24V64h-48zm72 344h-304.01V196h304.01v212z',
    );
  });

  it('Should open a datepicker', () => {
    render(<CreateDatePicker />);

    let datePickerCalendar = document.querySelector('.sha-el-calendar');
    expect(datePickerCalendar).toBeNull();

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    datePickerCalendar = document.querySelector('.sha-el-calendar');
    expect(datePickerCalendar).toBeDefined();
    const timePicker = document.querySelector('.rc-tooltip').querySelectorAll('.popover-element')[2];
    expect(timePicker).not.toBeDefined();
  });

  it('Should render a datepicker with today date', () => {
    MockDate.set(new Date(2021, 5, 3));
    render(<CreateDatePicker date={new Date()} />);

    const datePickerInput = document.querySelector('input');
    expect(datePickerInput.value).toBe('6/3/2021');
  });

  it('Should re-render on date change', () => {
    render(<CreateDatePicker />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    let datePickerCalendar = document.querySelector('.sha-el-calendar');

    const monthButton = datePickerCalendar.querySelectorAll('.sha-el-col')[0].querySelector('button');
    act(() => {
      fireEvent.click(monthButton);
    });
    const monthArray = document.querySelectorAll('.rc-tooltip')[1].querySelectorAll('li');
    act(() => {
      fireEvent.click(monthArray[6]);
    });

    const yearButton = datePickerCalendar.querySelectorAll('.sha-el-col')[1].querySelector('button');
    act(() => {
      fireEvent.click(yearButton);
    });
    const yearArray = document.querySelectorAll('.rc-tooltip')[2].querySelectorAll('li');
    act(() => {
      fireEvent.click(yearArray[2007 - 1980]);
    });

    const dateArray = datePickerCalendar.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    act(() => {
      fireEvent.click(dateArray[6].querySelector('button'));
    });

    datePickerCalendar = document.querySelector('.sha-el-calendar');
    expect(datePickerCalendar).toBeNull();

    const datePickerInput = document.querySelector('input');
    expect(datePickerInput.value).toBe('7/7/2007');
  });

  it('Should render a datepicker with timepicker', () => {
    render(<CreateDatePicker withTimePicker={{}} />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePicker = document.querySelector('.rc-tooltip').querySelectorAll('.popover-element')[2];
    expect(timePicker).toBeDefined();
  });

  it('Should render datepicker with today date and time', () => {
    MockDate.set(new Date(2025, 4, 18, 18, 6, 44));
    render(<CreateDatePicker withTimePicker={{}} date={new Date()} />);

    const datePickerInput = document.querySelector('input');
    expect(datePickerInput.value).toBe('5/18/2025, 6:06:44 PM');
  });

  it('Should close datepicker', () => {
    render(<CreateDatePicker withTimePicker={{}} />);

    expect(document.querySelectorAll('.rc-tooltip').length).toBe(0);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });
    expect(document.querySelectorAll('.rc-tooltip').length).toBe(1);

    act(() => {
      fireEvent.click(screen.getByText('Close').parentElement);
    });
    expect(document.querySelectorAll('.rc-tooltip').length).toBe(0);
  });

  it('Should not close datepicker with time picker when clicked on a date', () => {
    render(<CreateDatePicker withTimePicker={{}} date={new Date(2007, 6, 7)} />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    let datePickerCalendar = document.querySelector('.sha-el-calendar');

    const dateArray = datePickerCalendar.querySelectorAll('.sha-el-row')[2].querySelectorAll('.sha-el-col');
    act(() => {
      fireEvent.click(dateArray[0].querySelector('button'));
    });

    datePickerCalendar = document.querySelector('.sha-el-calendar');
    expect(datePickerCalendar).toBeDefined();
  });

  it('Should re-render on time change', () => {
    render(<CreateDatePicker withTimePicker={{}} date={new Date(2021, 6, 7)} />);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const timePicker = document.querySelector('.rc-tooltip').querySelectorAll('.popover-element')[2];
    act(() => {
      fireEvent.click(timePicker.querySelector('input'));
    });
    const timePickerContainer = document.querySelectorAll('.rc-tooltip')[1].querySelector('.sha-el-row').parentElement;

    const hours = timePickerContainer.querySelector('.hour-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(hours[22]);
    });

    const minutes = timePickerContainer.querySelector('.min-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(minutes[45]);
    });

    const seconds = timePickerContainer.querySelector('.sec-column').querySelectorAll('p');
    act(() => {
      fireEvent.click(seconds[49]);
    });

    act(() => {
      fireEvent.click(screen.getByText('Close').parentElement);
    });
    expect(document.querySelector('input').value).toBe('7/7/2021, 10:45:49 PM');
  });
});

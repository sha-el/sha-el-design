import React from 'react';
import { Card, Timeline, TimelineItem } from '../../../src';
import { MdEmail } from 'react-icons/md';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Tiemline', () => {
  it('should render a basic timeline', () => {
    render(
      <Timeline position="left">
        <TimelineItem iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
        <TimelineItem icon={<MdEmail />} iconBgColor="#4CAF50">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const container = document.querySelector('.timeline-left');

    const timelineItem = container.querySelector('.event');
    expect(timelineItem).toHaveStyle(`
      position: relative;
      margin: 10px 0;
    `);

    const content = timelineItem.querySelector('.content');
    expect(content).toHaveStyle(`
      position: relative;
      margin: 0 60px;
    `);

    expect(content.querySelector('div')).toHaveStyle(`
      background: #ffffff;
      box-sizing: border-box;
      border-radius: 16px;
    `);
    expect(content.querySelector('div').innerHTML).toBe('SMS');

    const extra = timelineItem.querySelector('.extra');
    expect(extra).toHaveStyle(`
      position: absolute;
      top: calc(50% - 10px);
      margin: 0 60px;
    `);
    expect(extra).toHaveStyle(`
      text-align: right;
      width: calc(50% - 120px);
    `);

    const tail = timelineItem.querySelector('.tail');
    expect(tail).toHaveStyle(`
      position: absolute;
      top: 10px;
      width: 30px;
      height: 110%;
      border-right: 2px solid #e8e8e8;
    `);
    expect(tail).toHaveStyle(`
      left: 0;
    `);

    const icon = timelineItem.querySelector('.icon');
    expect(icon).toHaveStyle(`
      display: flex;
      align-items: center;
      position: absolute;
      width: 40px;
      height: 40px;
      top: calc(50% - 20px);
      border-radius: 50%;
      text-align: center;
      cursor: default;
      font-size: 25px;
      padding: 0 7px;
      box-sizing: border-box;
    `);
    expect(icon).toHaveStyle(`
      left: 10px;
    `);
    expect(icon).toHaveStyle(`
      background: #2196F3;
      color: #ffffff;
    `);
    expect(icon.querySelector('svg').innerHTML).toContain(
      '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>',
    );

    const emailIcon = container.querySelectorAll('.event')[1].querySelector('.icon');
    expect(emailIcon).toHaveStyle(`
      background: #4CAF50;
      color: #ffffff;
    `);
    expect(emailIcon.querySelector('svg').innerHTML).toContain(
      '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>',
    );
  });

  it('should render a single timeline', () => {
    render(
      <Timeline position="left">
        <TimelineItem iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const timelineItem = document.querySelectorAll('.event');

    expect(timelineItem.length).toBe(1);

    expect(timelineItem[0].querySelector('.icon')).toHaveStyle(`
      left: 10px;
    `);

    expect(timelineItem[0].querySelector('.tail')).toHaveStyle(`
      left: 0px;
    `);
  });

  it('should render a timeline in right position', () => {
    render(
      <Timeline position="right">
        <TimelineItem iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
        <TimelineItem icon={<MdEmail />} iconBgColor="#4CAF50">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const timelineItem = document.querySelector('.event');

    expect(timelineItem.querySelector('.content')).toHaveStyle(`
      text-align: right;
    `);

    expect(timelineItem.querySelector('.tail')).toHaveStyle(`
      right: 30px;
    `);

    expect(timelineItem.querySelector('.icon')).toHaveStyle(`
      right: 10px;
    `);
  });

  it('should render a timeline in alternate position', () => {
    render(
      <Timeline position="alternate">
        <TimelineItem iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
        <TimelineItem icon={<MdEmail />} iconBgColor="#4CAF50">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const leftTimelineItem = document.querySelectorAll('.event')[0];

    expect(leftTimelineItem.querySelector('.tail')).toHaveStyle(`
      left: calc(50% - 50px);
    `);
    expect(leftTimelineItem.querySelector('.icon')).toHaveStyle(`
      left: calc(50% - 39px);
    `);
    expect(leftTimelineItem.querySelector('.content')).toHaveStyle(`
      text-align: right;
      width: calc(50% - 120px);
    `);

    const rightTimelineItem = document.querySelectorAll('.event')[1];

    expect(rightTimelineItem.querySelector('.tail')).toHaveStyle(`
      left: calc(50% - 50px);
    `);
    expect(rightTimelineItem.querySelector('.icon')).toHaveStyle(`
      left: calc(50% - 39px);
    `);
    expect(rightTimelineItem.querySelector('.content')).toHaveStyle(`
      width: calc(50% - 120px);
      left: calc(50% - 30px);
    `);
  });

  it('should render a left timeline with extra prop', () => {
    render(
      <Timeline>
        <TimelineItem extra="2010-20-20" iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const timelineItem = document.querySelector('.event');

    const extra = timelineItem.querySelector('.extra');
    expect(extra.innerHTML).toBe('2010-20-20');
    expect(extra).toHaveStyle(`
      position: absolute;
      top: calc(50% - 10px);
      margin: 0 60px;
    `);
    expect(extra).toHaveStyle(`
      text-align: right;
      width: calc(50% - 120px);
    `);

    expect(timelineItem.querySelector('.extra-content')).toHaveStyle(`
      width: calc(50% - 120px);
      left: calc(50% - 30px);
    `);

    expect(timelineItem.querySelector('.icon')).toHaveStyle(`
      left: calc(50% - 39px);
    `);

    expect(timelineItem.querySelector('.tail')).toHaveStyle(`
      left: calc(50% - 50px);
    `);
  });

  it('should render a right timeline with extra prop', () => {
    render(
      <Timeline position="right">
        <TimelineItem extra="2010-20-20" iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const timelineItem = document.querySelector('.event');

    const extra = timelineItem.querySelector('.extra');
    expect(extra.innerHTML).toBe('2010-20-20');
    expect(extra).toHaveStyle(`
      position: absolute;
      top: calc(50% - 10px);
      margin: 0 60px;
    `);
    expect(extra).toHaveStyle(`
      text-align: left;
      width: calc(50% - 120px);
      left: calc(50% - 30px);
    `);

    expect(timelineItem.querySelector('.extra-content')).toHaveStyle(`
      width: calc(50% - 120px);
    `);

    expect(timelineItem.querySelector('.icon')).toHaveStyle(`
      left: calc(50% - 39px);
    `);

    expect(timelineItem.querySelector('.tail')).toHaveStyle(`
      left: calc(50% - 50px);
    `);
  });

  it('should render an alternate timeline with extra prop', () => {
    render(
      <Timeline position="alternate">
        <TimelineItem iconBgColor="#2196F3">
          <Card>SMS</Card>
        </TimelineItem>
        <TimelineItem icon={<MdEmail />} iconBgColor="#4CAF50">
          <Card>SMS</Card>
        </TimelineItem>
      </Timeline>,
    );

    const timelineItems = document.querySelectorAll('.event');

    expect(timelineItems[0].querySelector('.extra')).toHaveStyle(`
      position: absolute;
      top: calc(50% - 10px);
      margin: 0 60px;
    `);
    expect(timelineItems[0].querySelector('.extra')).toHaveStyle(`
      text-align: left;
      width: calc(50% - 120px);
      left: calc(50% - 30px);
    `);

    expect(timelineItems[1].querySelector('.extra')).toHaveStyle(`
      position: absolute;
      top: calc(50% - 10px);
      margin: 0 60px;
    `);
    expect(timelineItems[1].querySelector('.extra')).toHaveStyle(`
      text-align: right;
      width: calc(50% - 120px);
    `);
  });
});

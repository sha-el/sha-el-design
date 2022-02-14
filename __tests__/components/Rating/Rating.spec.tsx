import React, { useState } from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import { Rating } from '../../../src/components/Rating';

import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { AiFillApple, AiOutlineApple } from 'react-icons/ai';

const ratingMouseEvents = (element: Element) => {
  const mouseClick = createEvent.click(element, {
    clientX: 573,
  });
  fireEvent(element, mouseClick);
};

const UncontrolledCheck: React.FC = () => {
  const [activeRating, setActiveRating] = useState(2);

  setTimeout(() => {
    act(() => {
      setActiveRating(4);
    });
  }, 100);
  return <Rating value={activeRating} totalCount={5} />;
};

describe('Rating', () => {
  it('should render a basic uncontrolled rating component', () => {
    const fn = jest.fn();

    render(<Rating value={2} totalCount={5} onChange={fn} />);

    const ratingOuterContainer = document.querySelector('.sha-el-rating-container');
    const ratingContainer = document.querySelectorAll('.sha-el-rating');

    ratingMouseEvents(ratingOuterContainer);
    expect(fn).toBeCalledTimes(1);
    expect(ratingContainer.length).toBe(5);
  });

  it('should render rating component with custom color', () => {
    const fn = jest.fn();
    render(<Rating value={2} totalCount={5} color="red" onChange={fn} />);

    const ratingOuterContainer = document.querySelector('.sha-el-rating-container');

    expect(ratingOuterContainer.querySelector('.sha-el-rating').querySelectorAll('.sha-el-rating-icon')[0])
      .toHaveStyle(`
        color: red
    `);
  });

  it('should render rating component with custom size', () => {
    const fn = jest.fn();

    render(<Rating value={2} totalCount={5} size={30} onChange={fn} />);

    const ratingIcon = document.querySelector('.sha-el-rating-icon');
    const elementHeight = ratingIcon[Object.keys(ratingIcon)[1]].height;
    const elementWidth = ratingIcon[Object.keys(ratingIcon)[1]].width;

    expect(elementHeight).toBe(30);
    expect(elementWidth).toBe(30);
  });

  it('should render rating component with custom icon (apple)', () => {
    const fn = jest.fn();
    render(
      <Rating
        value={2}
        totalCount={5}
        fillIcon={<AiFillApple className="sha-el-custom-icon" size={30} />}
        emptyIcon={<AiOutlineApple size={30} />}
        onChange={fn}
      />,
    );
    const customIconPath =
      'M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z';
    const ratingIconSvg = document.querySelector('.sha-el-rating').children[0].children[0].children;

    expect(ratingIconSvg[0][Object.keys(ratingIconSvg[0])[1]]['d']).toBe(customIconPath);

    const ratingIcon = document.querySelectorAll('.sha-el-rating')[0].querySelector('.sha-el-custom-icon').innerHTML;
    expect(ratingIcon).toContain(customIconPath);
  });

  it('should handle mouse leave', () => {
    render(<Rating color="red" value={2.5} totalCount={5} />);

    const ratingOuterContainer = document.querySelector('.sha-el-rating-container');

    act(() => {
      fireEvent.mouseMove(ratingOuterContainer, { clientX: 100 });
    });

    expect(ratingOuterContainer.querySelector('.sha-el-rating').querySelectorAll('.sha-el-rating-icon')[0])
      .toHaveStyle(`
        color: red
    `);

    act(() => {
      fireEvent.mouseLeave(ratingOuterContainer, { clientX: 0 });
    });

    expect(ratingOuterContainer.querySelectorAll('.sha-el-rating')[1].querySelectorAll('.sha-el-rating-icon')[0])
      .toHaveStyle(`
        color: red
    `);
  });

  it('should handle non editable', () => {
    const fn = jest.fn();
    render(<Rating color="red" value={2.5} editable={false} totalCount={5} onChange={fn} />);

    const starFillIconPath =
      'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z';

    const ratingOuterContainer = document.querySelector('.sha-el-rating-container');

    const ratingIcon = document.querySelectorAll('.sha-el-rating')[0].querySelector('.sha-el-rating-icon').innerHTML;
    expect(ratingIcon).toContain(starFillIconPath);

    act(() => {
      fireEvent.mouseMove(ratingOuterContainer, { clientX: 100 });
    });

    expect(ratingIcon).toContain(starFillIconPath);

    expect(ratingOuterContainer.querySelector('.sha-el-rating').querySelectorAll('.sha-el-rating-icon')[0])
      .toHaveStyle(`
    color: red
    `);

    act(() => {
      fireEvent.mouseLeave(ratingOuterContainer, { clientX: 0 });
    });

    expect(ratingOuterContainer.querySelectorAll('.sha-el-rating')[1].querySelectorAll('.sha-el-rating-icon')[0])
      .toHaveStyle(`
    color: red
    `);
    ratingMouseEvents(ratingOuterContainer);
    expect(fn).toBeCalledTimes(0);
  });

  it('should render a basic uncontrolled rating component', () => {
    jest.useFakeTimers();
    render(<UncontrolledCheck />);

    const starFillIconPath =
      'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z';

    jest.runAllTimers();
    const ratingIcon = document.querySelectorAll('.sha-el-rating')[3].querySelector('.sha-el-rating-icon').innerHTML;
    expect(ratingIcon).toContain(starFillIconPath);
  });
});

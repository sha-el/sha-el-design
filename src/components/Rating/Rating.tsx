import React, { useEffect, useRef, useState } from 'react';
import { classes } from '../../helpers';
import { style } from './style';
import { Theme, useTheme } from '../Theme/Theme';
import { BsStarFill, BsStar } from 'react-icons/bs';

export interface RatingProps {
  /**
   * Initial value of rating
   */
  value: number;

  /**
   * Total number of rating elements
   */
  totalCount: number;

  /**
   * Size of the element. won't work in case of custom icon
   */
  size?: number;

  /**
   * Precision of rating
   */
  precision?: number;

  /**
   * If the rating is editable
   */
  editable?: boolean;

  /**
   * If the rating is disabled
   */
  disabled?: boolean;

  /**
   * Color of rating component, won't work in case of custom icon
   */
  color?: keyof Theme | string;

  /**
   * Provide different fill icon with color and size
   */
  fillIcon?: React.ReactNode;

  /**
   * Provide corresponding empty icon with color and size
   */
  emptyIcon?: React.ReactNode;

  /**
   * onChange event handler
   */
  onChange?: (index: number) => void;
}

export const Rating: React.FC<RatingProps> = (props) => {
  const [activeRating, setActiveRating] = useState(props.value);
  const [hoverActiveRating, setHoverActiveRating] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeRating !== props.value) {
      setActiveRating(props.value);
    }
  }, [props.value]);

  const handleClick = (e: React.MouseEvent) => {
    if (!props.editable || props.disabled) {
      return;
    }
    setIsHovered(false);
    const calculatedRating = calculateRating(e);
    setActiveRating(calculatedRating);
    props.onChange?.(calculatedRating);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!props.editable || props.disabled) {
      return;
    }
    setIsHovered(true);
    setHoverActiveRating(calculateRating(e));
  };

  const handleMouseLeave = () => {
    setHoverActiveRating(-1);
    if (!props.editable || props.disabled) {
      return;
    }
    setIsHovered(false);
  };

  const calculateRating = (e: React.MouseEvent) => {
    const textRect: DOMRect = (ratingContainerRef?.current as HTMLElement).getBoundingClientRect() as DOMRect;
    const percent = (e.clientX - textRect.left) / textRect.width;
    const numberInRatingIcons = percent * props.totalCount;
    const nearestNumber = Math.round((numberInRatingIcons + props.precision / 2) / props.precision) * props.precision;
    return Number(nearestNumber.toFixed(props.precision.toString().split('.')[1]?.length || 0));
  };

  const theme = useTheme();

  const css = style(theme, props);

  return (
    <div
      ref={ratingContainerRef}
      className={classes(css.container, 'sha-el-rating-container')}
      onClick={handleClick}
      id="ratingContainer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {[...new Array(props.totalCount)].map((_arr, index) => {
        const activeState = isHovered ? hoverActiveRating : activeRating;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
        const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <div className={classes(css.backgroundDiv, 'sha-el-rating')} key={index}>
            <div
              style={{
                width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%',
              }}
              className={classes(css.ratingDiv, 'sha-el-rating-div')}
            >
              {props.fillIcon || <BsStarFill color={theme[props.color] || props.color} size={props.size} />}
            </div>
            <div>
              {showEmptyIcon
                ? props.emptyIcon || (
                    <BsStar
                      className="sha-el-rating-icon"
                      color={theme[props.color] || props.color}
                      size={props.size}
                    />
                  )
                : props.fillIcon || (
                    <BsStarFill
                      className="sha-el-rating-icon"
                      color={theme[props.color] || props.color}
                      size={props.size}
                    />
                  )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Rating.defaultProps = {
  color: 'primary',
  size: 20,
  precision: 1,
  editable: true,
  disabled: false,
};

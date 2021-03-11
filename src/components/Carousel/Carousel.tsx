import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Carousel: React.FC<CarouselProps> = (props) => {
  const [sliderIndex, setSlideIndex] = React.useState(Number(props.current) || 0);
  React.useEffect(() => {
    let cTimeout = null;
    if (props.autoScroll) {
      cTimeout = setTimeout(() => {
        setSlideIndex((sliderIndex + 1) % props.children.length);
      }, 3000);
    }
    return () => {
      window.clearTimeout(cTimeout);
    };
  }, [sliderIndex, props.children.length]);

  React.useEffect(() => {
    setSlideIndex(props.current);
  }, [props.current]);

  const theme = useTheme();
  const css = style(theme);

  return (
    <div className={css.container} style={{ width: props.width }}>
      <div
        className={css.carousel}
        style={{
          width: `${100 * props.children.length}%`,
          transform: `translate3d(-${(100 / props.children.length) * sliderIndex}%, 0, 0)`,
        }}
      >
        {props.children.map((v, index) => (
          <div className={css.item} key={index} style={{ width: getItemWidth(props.children.length) }}>
            {v}
          </div>
        ))}
      </div>
      {!props.hideDots && (
        <div className={css.dotsContainer}>
          {props.children.map((v, index) => (
            <li
              key={index}
              className={css.dots}
              onClick={() => setSlideIndex(index)}
              style={{
                background: index === sliderIndex && 'white',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Carousel.defaultProps = {
  current: 0,
};

const getItemWidth = (len: number) => {
  return 100 / len + '%';
};

export interface CarouselProps {
  width: string;
  children: React.ReactNode[];
  hideDots: boolean;
  onChange?: (current: number) => void;
  autoScroll?: boolean;
  current?: number;
}

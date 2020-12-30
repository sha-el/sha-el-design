import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Carousel: React.FC<CarouselProps> = (props) => {
  const [sliderIndex, setSlideIndex] = React.useState(0);
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

  const theme = useTheme();
  const css = style({ theme });

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
    </div>
  );
};

const getItemWidth = (len: number) => {
  return 100 / len + '%';
};

export interface CarouselProps {
  width: string;
  onChange?: (current: number) => void;
  autoScroll?: boolean;
  children: React.ReactNode[];
}

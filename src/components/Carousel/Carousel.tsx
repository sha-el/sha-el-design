import * as React from 'react';
import { stylesheet } from 'typestyle';
import { shadow } from '../../helpers/style';
import { Theme, ThemeConsumer } from '../Theme/Theme';

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

  return (
    <ThemeConsumer>
      {(theme) => {
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
      }}
    </ThemeConsumer>
  );
};

const style = (theme: Theme) =>
  stylesheet({
    container: {
      position: 'relative',
      display: 'block',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      width: '300px',
    },
    carousel: {
      transition: '1s all',
    },
    item: {
      display: 'inline-block',
      width: '300px',
    },
    dotsContainer: {
      position: 'absolute',
      textAlign: 'center',
      bottom: '10px',
      margin: 'auto',
      left: 0,
      right: 0,
      width: '50%',
    },
    dots: {
      display: 'inline-block',
      width: '20px',
      height: '5px',
      background: '#aaa',
      margin: '5px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: '.4s all',
      boxShadow: shadow('2X', theme),
      $nest: {
        '&:hover': {
          background: '#ccc',
        },
      },
    },
  });

const getItemWidth = (len: number) => {
  return 100 / len + '%';
};

export interface CarouselProps {
  width: string;
  onChange?: (current: number) => void;
  autoScroll?: boolean;
  children: React.ReactNode[];
}

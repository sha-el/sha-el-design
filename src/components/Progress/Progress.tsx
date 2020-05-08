import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import posed from 'react-pose';
import { getColor } from '../../helpers';
import { Theme, ThemeConsumer } from '../Theme/Theme';

export class Progress extends React.Component<ProgressProps, {}> {

  static defaultProps = {
    type: 'circle',
    status: 'primary',
  };

  render() {
    const { percent, text, status } = this.props;
    return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(status, theme);
          return (
            <div className={css.container}>
              <Bar
                pose='active'
                height={`${percent}px`}
                className={css.progress}
                poseKey={percent}
              />
              <div className={css.textContainer}>
                <span className={css.text}>{text}</span>
              </div>
            </div>
          );
        }}
      </ThemeConsumer>
    );
  }
}

const style = (status: ProgressProps['status'], theme: Theme) => {
  const color = theme[status];

  return stylesheet({
    container: {
      width: '100px',
      height: '100px',
      borderRadius: '100%',
      boxShadow: styleEnum.shadow,
      position: 'relative',
      overflow: 'hidden',
    },
    progress: {
      background: color,
      position: 'absolute',
      bottom: 0,
      width: '100px',
    },
    text: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    },
    textContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      background: 'rgba(255, 255, 255, .5)',
      color: getColor(getColor(color)),
      height: '80px',
      width: '80px',
      borderRadius: '100%',
    },
  });
};

const Bar = posed.div({
  active: {
    height: ({ height }) => height,
  },
});

interface ProgressProps {
  percent: number;
  type?: 'circle';
  text?: string;
  status?: 'primary' | 'secondary' | 'warning' | 'error' | 'info';
}

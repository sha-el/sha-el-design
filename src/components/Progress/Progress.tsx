import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import posed from 'react-pose';
import { Theme, ThemeService } from '../../helpers/theme';
import { getColor } from '../../helpers';

export class Progress extends React.Component<ProgressProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
    };
  }

  static defaultProps = {
    type: 'circle',
    status: 'primary',
  };

  private readonly theme = new ThemeService();

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  render() {
    const css = this.css();
    const { percent, text } = this.props;
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
  }

  css = () => {
    const { status } = this.props;
    const color = this.state.theme[status];
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
  }
}

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

interface State {
  theme: Theme;
}
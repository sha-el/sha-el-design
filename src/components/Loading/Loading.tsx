import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { stylesheet } from 'typestyle';
import SplitText from 'react-pose-text';

import { Theme, ThemeService } from '../../helpers/theme';
import { color } from 'csx';

export class Loading extends React.Component<LoadingProps, State> {
  constructor(props: LoadingProps) {
    super(props);

    this.state = {
      list: [1, 2, 3, 4, 5],
      theme: this.theme.selectedTheme$.value,
    };
  }

  theme = new ThemeService();

  componentDidMount() {
    setInterval(this.shiftArray, 500);
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  shiftArray = () => {
    let list = this.state.list;
    const item = list.pop();
    list = [item].concat(list);
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    const { isLoading } = this.props;
    const style = this.css();

    if (isLoading) {
      return (
        <div>
          <PoseGroup>
            {list.map((v) =>
              <Loader
                key={v}
                className={style.loader}
                pose='attention'
                background={
                  color(this.state.theme.primary).lighten(v / 10).toHexString()
                }
              />,
            )}
          </PoseGroup>
          <div>
            <SplitText initialPose='exit' pose='enter' charPoses={charPoses}>Loading...</SplitText>
          </div>
        </div>
      );
    }
    return (
      this.props.children
    );
  }

  css = () => stylesheet({
    loader: {
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'inline-block',
      margin: '5px',
    },
  })
}

export interface LoadingProps {
  isLoading: boolean;
}

interface State {
  list: any[];
  theme: Theme;
}

const Loader = posed.div({
  attention: {
    background: ({background}) => background,
  },
  done: {
    scale: 1,
  },
});

const charPoses = {
  exit: { opacity: 0 },
  enter: { opacity: 1 },
};

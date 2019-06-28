import * as React from 'react';
import { stylesheet, keyframes } from 'typestyle';

import { Theme, ThemeService } from '../../helpers/theme';

export class Loading extends React.Component<LoadingProps, State> {
  constructor(props: LoadingProps) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
    };
  }

  theme = new ThemeService();

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  render() {
    const {
      render,
      isLoading,
    } = this.props;

    if (!isLoading) {
      return render();
    }

    return (
      <div {...this.props} className={this.css().loader} />
    );
  }

  css = () => {
    const animation = keyframes({
      '0%': {
        transform: 'rotate(0)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    });

    const { theme } = this.state;

    const animation2 = keyframes({
      '0%': {
        borderTopColor: theme.error,
      },
      '25%': {
        borderTopColor: theme.warning,
      },
      '50%': {
        borderTopColor: theme.info,
      },
      '100%': {
        borderTopColor: theme.secondary,
      },
    });

    return stylesheet({
      loader: {
        margin: '0px auto',
        borderRadius: '50%',
        border: '4px solid #f1f1f1',
        borderTop: '4px solid red',
        width: '50px',
        height: '50px',
        animation: `1.5s ${animation} infinite linear, 6s ${animation2} infinite linear`,
        // transform: 'translate(-50%, -50%)',
      },
    });
  }
}

export interface LoadingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading: boolean;
  render?: () => React.ReactNode;
  style?: React.CSSProperties;
}

interface State {
  theme: Theme;
}

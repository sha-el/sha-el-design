import * as React from 'react';
import { render } from 'react-dom';

import { MdInfoOutline, MdErrorOutline, MdWarning, MdDone } from 'react-icons/md';
import { stylesheet } from 'typestyle';
import { flexRoot } from 'csstips';

import { ThemeService, Theme } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';
import { Portal } from '../Popover/Portal';
import { NotificationProps, notificationSubject$ } from './NotificationService';
import posed, { PoseGroup } from 'react-pose';
import { isBrowser } from '../../helpers';

const NOTIFICATION_DIV_ID = 'notification-div-id';

export class NotificationContainer extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.getValue(),
      notification: notificationSubject$.getValue(),
    };
  }

  theme = new ThemeService();

  static defaultProps = {
    type: 'info',
  };

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(theme => this.setState({ theme }));
    notificationSubject$.subscribe(notification => this.setState({ notification }));
  }

  getIcon = (index: number) => {
    const {
      error,
      warning,
    } = this.state.theme;

    const notification = this.state.notification[index];
    switch (notification.type) {
      case 'info': return (<MdInfoOutline style={{ color: '#1890ff' }} />);
      case 'error': return (<MdErrorOutline style={{ color: error }} />);
      case 'warning': return (<MdWarning style={{ color: warning }} />);
      case 'success': return (<MdDone style={{ color: 'green' }} />);
      default:
        return (<MdInfoOutline style={{ color: '#1890ff' }} />);
    }
  }

  render() {
    const css = this.style();
    return (
      <Portal>
        <div className={css.body}>
          <PoseGroup>
            {this.state.notification.map(
              (notification, index) => (
                <NotificationTile className={css.container} key={`noti-${index}`}>
                  <div className={css.titleContainer}>
                    <div className={css.titleIcon}>
                      {this.getIcon(index)}
                    </div>
                    <div className={css.title}>
                      {notification.title}
                    </div>
                  </div>
                  <div className={css.message}>
                    {notification.message}
                  </div>
                </NotificationTile>
              ),
            )}
          </PoseGroup>
        </div>
      </Portal>
    );
  }

  style = () => {
    return stylesheet({
      body: {
        position: 'fixed',
        right: '20px',
        top: '20px',
        zIndex: 10000,
      },
      container: {
        boxShadow: styleEnum.shadow_2x,
        padding: '9px 32px',
      },
      titleContainer: {
        ...flexRoot,
        alignItems: 'center',
      },
      titleIcon: {
        fontSize: '30px',
        display: 'flex',
      },
      title: {
        padding: '0 10px',
      },
      message: {
        marginLeft: '40px',
      },
    });
  }
}

const NotificationTile = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      y: { ease: 'easeOut', duration: 600 },
      opacity: { ease: 'easeOut', duration: 300 },
    },
  },
  exit: {
    x: '100px',
    opacity: 0,
    transition: {
      x: { ease: 'easeOut', duration: 600 },
      opacity: { ease: 'easeOut', duration: 300 },
    },
  },
});

interface State {
  theme: Theme;
  notification: NotificationProps[];
}

export const initializeNotification = () => {
  if (isBrowser()) {
    let div = document.getElementById(NOTIFICATION_DIV_ID);
    if (!div) {
      div = document.createElement('div');
      document.body.append(div);
    }
    render(<NotificationContainer />, div);
  }
};
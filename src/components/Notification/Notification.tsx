import * as React from 'react';
import { render } from 'react-dom';

import { MdInfoOutline, MdErrorOutline, MdWarning, MdDoneAll } from 'react-icons/md';
import { Portal } from '../Popover/Portal';
import { NotificationProps, notificationSubject$ } from './NotificationService';
import posed, { PoseGroup } from 'react-pose';
import { isBrowser, getColor } from '../../helpers';
import { DARK_THEME, Theme } from '../Theme/Theme';
import { ListItem } from '../List';
import { Text } from '../Text';
import { shadow } from '../../helpers/style';
import { style } from './style';

const NOTIFICATION_DIV_ID = 'notification-div-id';

export class NotificationContainer extends React.Component<unknown, State> {
  constructor(props) {
    super(props);

    this.state = {
      notification: notificationSubject$.getValue(),
    };
  }

  static defaultProps = {
    type: 'info',
  };

  componentDidMount() {
    notificationSubject$.subscribe((notification) => this.setState({ notification }));
  }

  getIcon = (index: number, theme: Theme) => {
    const { error, warning, info } = theme;

    const notification = this.state.notification[index];
    switch (notification.type) {
      case 'info':
        return <MdInfoOutline style={{ color: getColor(info), fontSize: '30px' }} />;
      case 'error':
        return <MdErrorOutline style={{ color: getColor(error), fontSize: '30px' }} />;
      case 'warning':
        return <MdWarning style={{ color: getColor(warning), fontSize: '30px' }} />;
      case 'success':
        return <MdDoneAll style={{ color: getColor('#00c853'), fontSize: '30px' }} />;
      default:
        return <MdInfoOutline style={{ color: getColor(info), fontSize: '30px' }} />;
    }
  };

  color = (index: number, { primary, error, warning }: Theme) =>
    ({
      info: primary,
      error,
      warning,
      success: '#00c853',
    }[this.state.notification[index].type]);

  render() {
    return <Container notification={this.state.notification} getIcon={this.getIcon} color={this.color} />;
  }
}

const Container: React.FC<ContainerProps> = (props) => {
  const css = style;
  const theme = DARK_THEME;
  const { notification, getIcon, color } = props;

  return (
    <Portal>
      <div className={css}>
        <PoseGroup>
          {notification.map((notification, index) => (
            <NotificationTile style={notification.style || {}} key={`noti-${index}`}>
              <ListItem
                avatar={getIcon(index, theme)}
                subtitle={<Text color={getColor(color(index, theme))}>{notification.message}</Text>}
                style={{
                  background: color(index, theme),
                  boxShadow: shadow('2X', theme),
                  borderRadius: '4px',
                  minWidth: '400px',
                  color: getColor(color(index, theme)),
                }}
              >
                {notification.title}
              </ListItem>
            </NotificationTile>
          ))}
        </PoseGroup>
      </div>
    </Portal>
  );
};

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
  notification: NotificationProps[];
}

interface ContainerProps extends State {
  getIcon: (index: number, theme: Theme) => JSX.Element;
  color: (index: number, { primary, error, warning }: Theme) => string;
}

export const initializeNotification = () => {
  if (isBrowser()) {
    let div = document.getElementById(NOTIFICATION_DIV_ID);
    if (!div) {
      div = document.createElement('div');
      div.id = NOTIFICATION_DIV_ID;
      document.body.append(div);
    }
    render(<NotificationContainer />, div);
  }
};

import { BehaviorSubject } from 'rxjs';

export interface NotificationProps {
  id?: string;
  title: React.ReactNode;
  type?: 'info' | 'error' | 'warning' | 'success';
  message?: React.ReactNode;
  duration?: number;
  callBack?: () => void;
  style?: React.CSSProperties;
}

function generateGuid() {
  let result, i, j;
  result = '';
  for (j = 0; j < 32; j++) {
    if (j === 8 || j === 12 || j === 16 || j === 20) result = result + '-';
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
}

export const notificationSubject$ = new BehaviorSubject<NotificationProps[]>([]);

export const notify = (props: NotificationProps) => {
  const duration = props.duration || 4000;
  const values = notificationSubject$.getValue();
  props.id = generateGuid();
  notificationSubject$.next(values.concat([props]));
  setTimeout(() => removeNotification(props), duration);
};

const removeNotification = (props: NotificationProps) => {
  const values = notificationSubject$.getValue().filter((v) => v.id !== props.id);
  notificationSubject$.next(values);
  if (props.callBack) {
    props.callBack();
  }
};

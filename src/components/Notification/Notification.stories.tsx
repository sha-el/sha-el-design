import React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '../Button';
import { notify } from './NotificationService';
import { NotificationContainer } from './Notification';

export default {
  title: 'Feedback/Notification',
  component: NotificationContainer,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic = () => (
  <>
    <NotificationContainer />
    <Button
      onClick={() =>
        notify({
          type: 'info',
          title: 'hey there',
          message: 'This is an example for info',
        })
      }
    >
      Info
    </Button>
    <Button
      onClick={() =>
        notify({
          type: 'error',
          title: 'hey there',
          message: 'This is an example for error',
        })
      }
    >
      Error
    </Button>
    <Button
      onClick={() =>
        notify({
          type: 'warning',
          title: 'hey there',
          message: 'This is an example for warning',
        })
      }
    >
      Warning
    </Button>
    <Button
      onClick={() =>
        notify({
          type: 'success',
          title: 'hey there',
          message: 'This is an example for success',
        })
      }
    >
      Success
    </Button>
  </>
);

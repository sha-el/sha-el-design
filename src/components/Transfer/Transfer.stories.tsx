import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Transfer } from '../Transfer';

const stories = storiesOf('Transfer', module);

stories.add(
  'Basic',
  withInfo()(() => {
    const [values, update] = React.useState(['Banner', 'Stark', 'Steve']);
    return (
      <Transfer
        data={() => ['Bruce', 'Clark', 'Arthur', 'Diana', 'Banner', 'Stark', 'Steve']}
        values={values}
        onChange={update}
        listDisplayProp={(e) => e}
        uniqueIdentifier={(e) => e}
      />
    );
  }),
);

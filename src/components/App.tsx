import * as React from 'react';
import { Input } from './Input';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Popover } from './Popover';

export const App: React.StatelessComponent = () => {
  new ThemeService();
  cssRule('span, div, input', {
    fontSize: '14px',
  });

  return (
    <div style={{ width: '300px', marginLeft: '200px' }}>
      <Input
            label='Email'
            // before={<span>Hello</span>}
            // after={<span>World!</span>}
            // error='NEw Error'
            // value='HEllo'
      />
      <Popover
        content='oladjnxendceihcnfehcnfeinefhnefnc'
        title='Hello'
        trigger='onHover'
        postion='left'
      >
        <Input
          label='Email'
          // before={<span>Hello</span>}
          // after={<span>World!</span>}
          // error='NEw Error'
          // value='HEllo'
        />
      </Popover>
      <Input
          label='Email'
          // before={<span>Hello</span>}
          // after={<span>World!</span>}
          // error='NEw Error'
          // value='HEllo'
      />
    </div>
  );
};
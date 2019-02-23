import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Tabs, TabPanel } from './Tabs';

export const App: React.StatelessComponent = () => {
  new ThemeService();
  cssRule('span, div, input, button', {
    fontSize: '14px',
  });

  return (
    <div style={{width: '100px'}}>
      <Tabs
        defaultActiveKey='hello'
      >
        <TabPanel title='HELLO' name='hello' key='hello'>
          <h1>HELLO</h1>
        </TabPanel>
        <TabPanel title='HELLO1' name='hello1' key='hello1'>
          <h1>HELLO1</h1>
        </TabPanel>
      </Tabs>
    </div>
  );
};
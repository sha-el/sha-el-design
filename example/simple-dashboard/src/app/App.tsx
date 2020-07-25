import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'sha-el-design/lib/components/Theme/Theme';
import { Dashboard } from '@components/Dashboard';

export class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme="LIGHT">
        <BrowserRouter>
          <Switch>
            <Route exact path="" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

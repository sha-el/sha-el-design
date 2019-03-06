import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import {forceRenderStyles} from 'typestyle';

render(
  <App />,
  document.getElementById('root'),
);

forceRenderStyles();
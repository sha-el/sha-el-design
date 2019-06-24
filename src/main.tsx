import * as React from 'react';
import { render } from 'react-dom';
import {forceRenderStyles} from 'typestyle';
import { App } from './components/App';
import { initialize } from './helpers';

initialize();

render(
  <App />,
  document.getElementById('root'),
);

forceRenderStyles();
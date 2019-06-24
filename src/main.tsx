import * as React from 'react';
import { render, hydrate } from 'react-dom';
import {forceRenderStyles} from 'typestyle';
import { App } from './components/App';
import { initialize } from './helpers';

initialize();

hydrate(
  <App />,
  document.getElementById('root'),
);

forceRenderStyles();
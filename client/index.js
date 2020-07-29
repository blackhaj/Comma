const path = require('path')
import React from 'react';
import { render } from 'react-dom';
import styles from './scss/application.scss';
import App from './App.js'

// For async methods to work
import 'core-js/stable';
import 'regenerator-runtime/runtime';

render(
  <App/>,
  document.getElementById('root')
);

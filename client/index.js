const path = require('path')
import React from 'react';
import { render } from 'react-dom';
import styles from './scss/application.scss';
import App from './components/App.js'

render(
  <App/>,
  document.getElementById('root')
);

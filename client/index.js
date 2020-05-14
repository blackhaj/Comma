const path = require('path')
import React from 'react';
import { render } from 'react-dom';
import styles from './scss/application.scss';
import App from './components/App.jsx'

// // React Router
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// // Pages / Components
// import Home from './components/pages/Home.jsx'
// import Accounts from './components/pages/Accounts.jsx'
// import Add from './components/pages/Add.jsx'
// import Stats from './components/pages/Stats.jsx'
// import History from './components/pages/History.jsx'

// import NavBar from './components/NavBar.jsx'


render(
  <App/>,
  document.getElementById('root')
);

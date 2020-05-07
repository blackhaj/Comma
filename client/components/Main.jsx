import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Accounts from './pages/Accounts.jsx';
import Add from './pages/Add.jsx';
import Stats from './pages/Stats.jsx';
import History from './pages/History.jsx';

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='/accounts'>
          <Accounts />
        </Route>
        <Route path='/add'>
          <Add />
        </Route>
        <Route path='/stats'>
          <Stats />
        </Route>
        <Route path='/history'>
          <History />
        </Route>
      </Switch>
    )
  }
}

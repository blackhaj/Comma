import React, { Component } from 'react';

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages / Components
import Home from './pages/Home.jsx'
import Accounts from './pages/Accounts.jsx'
import Add from './pages/Add.jsx'
import Stats from './pages/Stats.jsx'
import History from './pages/History.jsx'
import ProtectedRoute from './ProtectedRoute.js';
import SignIn from './pages/SignIn.jsx'

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <Router>
        <div className='appContainer'>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/accounts" component={Accounts} />
            <ProtectedRoute exact path="/add" component={Add} />
            <ProtectedRoute exact path="/stats" component={Stats} />
            <ProtectedRoute exact path="/history" component={History} />
            <Route exact path='/signin' component={SignIn} />
            <Route path='/*' component={()=> "404 Not Found"}/>
          </Switch>
        </div>
        </Router>
    )
  }
}

export default App;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Component imports
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// Page imports
import Home from './Pages/Home'
import Accounts from './Pages/Accounts'
import Add from './Pages/Add'
import Account from './Pages/Account'

class App extends Component {

  state = {
    isLoggedIn: true,
  }
  
  render() {
    return (
      <Router >
        <NavBar />

        {this.state.isLoggedIn ? 
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/accounts" component={Accounts} exact />
            <Route path="/accounts/:name" component={Account} />
            <Route path="/add" component={Add} exact />
          </main>
          : <h1> Log In</h1> }
        <Footer />

      </Router>
    )
  }
}

export default App;
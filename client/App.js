import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Component imports
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// Page imports
import Home from './Pages/Home'
import Accounts from './Pages/Accounts'
import Account from './Pages/Account'
import Login from './Pages/Login'

// User Context
import { UserContext } from './UserContext'


class App extends Component {

  state = {
    userData: {
      isLoggedIn: false,
      userId: null,
      token: null,
    },
    // netWorth: {
    //   fetched: false,
    //   data: {
    //     labels: null,
    //     datasets: [{
    //       data: null,
    //       backgroundColor: "#E362A0",
    //     }]
    //   }
    // },
    // currentAccounts: {
    //   fetched: false,
    //   data: {
    //     labels: null,
    //     datasets: [{
    //       data: null,
    //       backgroundColor: "#548ADC",
    //     }]
    //   }
    // }

  }
  
  // Method to login user and update state with details
  logInUser = (email, password) => {
    console.log("LOGGING IN USER")
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password})
    })
      .then((response) => response.json())
      .then((payload) => {
        this.setState({
          userData: {
            isLoggedIn: true,
            ...payload
          }
        });
      })
      .catch((error) => console.error(error))
  }

  render() {
    return (
      // Pass down user context
      <UserContext.Provider value={{
        userData: this.state.userData, 
        logInUser: this.logInUser,
        }}>
        
        {/* If logged in, render main routes else render login page */}
        <Router >
          <NavBar isUserLoggedIn={this.state.userData.isLoggedIn} />
            <main>
              {this.state.userData.isLoggedIn ? 
                  <>
                    <Route path="/" component={Home} exact />
                    <Route path="/accounts" component={Accounts} exact />
                    <Route path="/accounts/:name" component={Account} />
                  </>
                : <Login /> }
            </main>
          <Footer />
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App;
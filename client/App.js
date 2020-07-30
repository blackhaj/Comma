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
import Login from './Pages/Login'

import { UserContext } from './UserContext'


class App extends Component {

  state = {
    userData: {
      isLoggedIn: false,
      userId: null,
      token: null,
    }
  }

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
        console.log("THIS", this)
        console.log("HERE IS THE PAYLOAD", payload)
        this.setState({
          userData: {
            isLoggedIn: true,
            ...payload
          }
        });
      })
      .catch((error) => console.error(error))
  }

  // Load login page
  // onSubmit logs in user and updates APP level state with user details
  
  render() {
    const { userID } = this.state.userData;
    console.log(this.state)

    return (
      <UserContext.Provider value={{
        userData: this.state.userData, 
        logInUser:this.logInUser,
        }}>
        
        <Router >
          
          <NavBar isUserLoggedIn={this.state.userData.isLoggedIn} />
            <main>
              {this.state.userData.isLoggedIn ? 
                  <>
                    <Route path="/" component={Home} exact />
                    <Route path="/accounts" component={Accounts} exact />
                    <Route path="/accounts/:name" component={Account} />
                    <Route path="/add" component={Add} exact />
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
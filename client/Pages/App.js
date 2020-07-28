import React, { Component } from 'react';

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import Home from './Home'

class App extends Component {
  
  render() {
    return (
      <>
        <NavBar />

        <main>
          <Home />
        </main>

        <Footer />
      </>
    )
  }
}

export default App;
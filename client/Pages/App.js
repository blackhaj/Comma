import React, { Component } from 'react';
import Graph from '../components/Graph.js'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

class App extends Component {
  
  render() {
    return (
      <>
        <NavBar />
        <main >
          <h1>Account</h1>
          <Graph />
          <button className={'button is-primary'}>Click Me!</button>
        </main>
        <Footer />
      </>
    )
  }
}

export default App;
import React, { Component } from 'react';
import NavBar from './NavBar.jsx'
import MainContainer from './MainContainer.jsx';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div id='appContainer'>
        <MainContainer />
        <NavBar />
      </div>
    )
  }
}

export default App;
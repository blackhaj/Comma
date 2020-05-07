import React, { Component } from 'react'
import TitleBar from './TitleBar.jsx';
import Graph from './Graph.jsx'

export default class MainContainer extends Component {
  render() {
    return (
      <div id='main-container'>
        <TitleBar />
        <Graph />
      </div>
    )
  }
}

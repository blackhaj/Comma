import React, { Component } from 'react';
import TitleBar from '../TitleBar.jsx';
import Graph from '../Graph.jsx';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  getData() {
    fetch('/api/accounts/1/balances')
    .then(response => response.json())
    .then(body => {
      let dates = body.data.map((obj) => obj.date )
      let balances = body.data.map((obj) => obj.balance )
      this.setState({graphData: {
        dates: dates,
        balances: balances,
      }})
    })

    // this.setState({accounts: json});
  }

  componentDidMount(){
    this.getData()
  }

  render() {
    return (
      <div>
        <TitleBar title={"Home"} />
        <Graph data={this.state.graphData}/>
      </div>
    )
  }

  
}

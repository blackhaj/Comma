import React, { Component } from 'react'
import Graph from '../components/Graph.js'

export default class Home extends Component {

  state = {
    netWorth: {
      fetched: false,
      data: {

      }
    },
    currentAccounts: {
      fetched: false,
      data: {

      }
    }
  }

  componentDidMount() {
    this.getNetWorth();
    this.getCurretAccountTotals();

  }

  getCurretAccountTotals() {
    fetch('/api/overview/currents')
      .then((response) => response.json())
      .then((payload) => {
      this.setState({
          currentAccounts: {
            fetched: true,
            data: {
              labels: payload.dates,
              datasets: [{
                data: payload.values,
                backgroundColor: "#548ADC",
              }]
            }
          }
        })
      })
  }

  getNetWorth() {
    fetch('/api/overview/worth')
    .then((response) => response.json())
    .then((payload) => {
      this.setState({
        netWorth: {
          fetched: true,
          data: {
            labels: payload.dates,
            datasets: [{
              data: payload.values,
              backgroundColor: "#E362A0",
            }]
          }
        }
      }) 
    })
  }

  render() {
    console.log("STATE", this.state)
    return (
      <>
        <div class="content is-medium stats-chapter" >
          <h1>💰Net Worth</h1>
          <p>Your net worth went up by £1,000 over the last month. Score 💪🏼. That's a 0.5% increase. Keep going like that and you will be worth £120,000 in 20 years. You can check out your net worth chart below.</p>
          <Graph data={this.state.netWorth.data} fetched={this.state.netWorth.fetched} /> 
        </div>
        
        <div class="content is-medium stats-chapter" >
          <h1>🥛In and Out</h1>
          <p>Not such good news on your spending... You spent about £900 more than you earnt last month. We all have these sorts of months but keep going at this rate and you will be broke by the time your 38. Broke Henry's not as fun so reign it in</p>
          <Graph data={this.state.currentAccounts.data} fetched={this.state.currentAccounts.fetched} />
        </div>
        
      </>
    )
  }
}

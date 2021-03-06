import React, { Component } from 'react'
import Chart from '../components/Chart.js'
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { UserContext } from '../UserContext'

export default class Home extends Component {
  static contextType = UserContext;

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

  // Fetch data for charts
  componentDidMount() {
    this.getNetWorth();
    this.getCurrentAccountTotals();
  }

  // Fetch Net Worth Data
  getNetWorth() {
    fetch('/api/overview/worth',{
      headers: {
        'Authorization': `Bearer ${this.context.userData.token}`
      }
    })
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
    .catch((error) => console.log('There was an error -->', error))
  }

  // Fetch current accounts balances - TODO could be negated with additional computations on first call
  getCurrentAccountTotals() {
    fetch('/api/overview/currents', {
        headers: {
          'Authorization': `Bearer ${this.context.userData.token}`
        }
      })
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

  // TODO - make text dynamic based off the stats inputs
  render() {
    return (
      <>
        <div className="content is-medium stats-chapter" >
          <h1>💰Net Worth</h1>
          <p>Your net worth change by <RoughNotation type="highlight" color={'#FFF176'} show={true}>£1,000</RoughNotation> over the last month. That's a 0.5% increase. Keep going like that and <RoughNotation type="underline" color={'#F44336'} show={true}>you will be worth £120,000 in 20 years</RoughNotation>. You can check out your net worth chart below.</p>
          <Chart data={this.state.netWorth.data} fetched={this.state.netWorth.fetched} /> 
        </div>
        
        <div className="content is-medium stats-chapter" >
          <h1>🥛In and Out</h1>
          <p>Not such good news on your spending... <RoughNotation type="box" color={'#1B5E20'} show={true}>You spent about £900 more than you earnt last month</RoughNotation>. We all have these sorts of months but keep going at this rate and you will be broke by the time your 38. Broke Henry's not as fun so reign it in</p>
          <Chart data={this.state.currentAccounts.data} fetched={this.state.currentAccounts.fetched} />
        </div>
      </>
    )
  }
}

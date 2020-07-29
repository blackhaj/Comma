import React, { Component } from 'react'
import Chart from '../components/Chart.js'

export default class Account extends Component {

  state = {
    fetched: false,
  }

  accountID = this.props.location.accountID

  componentDidMount() {
    this.getAccountBalances();
  }

  getAccountBalances() {
    fetch(`/api/accounts/${this.accountID}/balances`)
      .then((response) => response.json())
      .then((payload) => {
        this.setState({
              fetched: true,
              data: {
                labels: payload.dates,
                datasets: [{
                  data: payload.values,
                  backgroundColor: "#548ADC",
                }]
              }
            })
        })
      .catch((error) => console.error(error))
  }

  
  render() {
    return (
      <>
        <div className="content is-medium stats-chapter" >
          <h1>{this.props.location.accountName}</h1>
          <p></p>
          <Chart data={this.state.data} fetched={this.state.fetched} /> 
        </div>
      </>
    )
  }
}

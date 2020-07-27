import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class Card extends Component {

  state = {
    fetched: false
  }

  componentDidMount() {
    console.log("Inside component did mount")
    fetch('/api/accounts/1/balances')
      .then( response => response.json())
      .then( payload => {
        console.log(payload)
        this.setState({
          fetched: true,
          ...payload
        })
      })
  }

  render() {
    let output;
    if (this.state.fetched){
      output = (<Plot 
        data={[
          {
            x: this.state.date,
            y: this.state.balance,
            mode: 'none',
            type: 'scattergl',
            fill: 'tozeroy',
            fillcolor: '#4BA4F4'
          }
        ]}
        layout={{width: 320, height: 240, margin: {l: 30, r: 10, b: 30, t: 10}, yaxis: {autorange: true}}}
        config={{displayModeBar: false}}
      />)
    } else {
      output = <h1>Loading</h1>
    }

    return (
      <div className='card'>
        {output}
        <h1>Henry</h1>
      </div>
    )
  }
}

// https://github.com/plotly/react-plotly.js/blob/master/README.md
// https://plotly.com/javascript/reference/#bar
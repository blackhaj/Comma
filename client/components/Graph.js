import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class Card extends Component {

  state = {
    fetched: false
  }

  componentDidMount() {
    fetch('/api/accounts/2/balances')
      .then( response => response.json())
      .then( payload => {
        this.setState({
          fetched: true,
          ...payload
        })
      })
  }

  render() {
    let output;
    if (this.state.fetched){
      output = <Plot 
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
        layout={{width: 320, height: 240, margin: {l: 30, r: 10, b: 30, t: 10}, yaxis: {range: [500,2000]}}}
        config={{displayModeBar: false}}
      />
    } else {
      output = <h1>Wanker</h1>
    }

    return (
      <div className='card'>
        {output}
      </div>
    )
  }
}

// https://github.com/plotly/react-plotly.js/blob/master/README.md
// https://plotly.com/javascript/reference/#bar
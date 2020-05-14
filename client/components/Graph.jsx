import React, { Component } from 'react';
import Plot from 'react-plotly.js';
const dates = [
  "2019-01-01",
  "2019-02-01",
  "2019-03-01",
  "2019-04-01",
  "2019-05-01",
  "2019-06-01",
  "2019-07-01",
  "2019-08-01",
  "2019-09-01",
  "2019-10-01",
  "2019-11-01",
  "2019-12-01"
]
const balances = [
  "1000",
  "1077.8292851314",
  "1056.9707208628106",
  "1011.4230105318165",
  "1280.4601643568963",
  "1246.5236049556274",
  "1594.2490714050964",
  "1397.9523718173732",
  "1035.1826098757933",
  "1138.2455309109264",
  "1911.4746773973525",
  "1002.9841051342213"
]

export default class Card extends Component {
  render() {
    return (
      <div className='card'>
        <Plot 
        data={[
          {
            x: dates,
            y: balances,
            mode: 'none',
            type: 'scattergl',
            fill: 'tozeroy',
            fillcolor: '#4BA4F4'
          }
        ]}
        layout={{width: 320, height: 240, margin: {l: 30, r: 10, b: 30, t: 10}, yaxis: {range: [500,2000]}}}
        config={{displayModeBar: false}}
      />
      </div>
    )
  }
}

// https://github.com/plotly/react-plotly.js/blob/master/README.md
// https://plotly.com/javascript/reference/#bar
import React, { Component } from 'react';
import Plot from 'react-plotly.js';


export default class Card extends Component {
  render() {
    return (
      <div className='card'>
        <Plot className
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            mode: 'markers',
            marker: {color: 'red'},
          }
        ]}
        layout={{width: 320, height: 240, margin: {l: 20, r: 20, b: 20, t: 0}}}
        config={{displayModeBar: false}}
      />
      </div>
    )
  }
}

// https://github.com/plotly/react-plotly.js/blob/master/README.md
// https://plotly.com/javascript/reference/#bar
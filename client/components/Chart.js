import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default function Chart(props) {

  // Either renders loading wheel or chart
  let output;
  if (props.fetched){
    let options = {
      scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 400,

            }
        }]
      },
      legend:{
        display:false
      }
    }
    output = <Line data={props.data} options={options} />
  } else {
    output = <button className="button is-loading chart-loading">Loading</button>
  }

  return (
    <div className='chart'>
        {output}
    </div>
  )
}


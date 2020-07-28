import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
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
    output = <button class="button is-loading chart-loading">Loading</button>
  }


  return (
    <div class='chart'>
        {output}
    </div>
  )
}


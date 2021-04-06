import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';

export class DatabaseInteractions extends React.Component {
  render() {
    let collect_status = "NOT SET"
    if(this.props.collect) {
      collect_status = "Collecting"
    } else {
      collect_status = "Not Collecting"
    }

    let labels = [];
    let data = [];
    for(let i = 0; i < this.props.user.readings.length; i++) {
      labels.push(this.props.user.readings[i][1])
      data.push(this.props.user.readings[i][2])
    }
    
    let options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }

    return (
      <div id="db-parent" className="container">
        <h1 id="section-title">Database Interactions</h1>
        
        {/* Buttons */}
        <div className="container" id="db-buttons-container">

          {/* Collect Button */}
          <div className="container" id="db-button" >
            <div className="row align-items-start" >
              <div className="col-4">
                <div className="d-flex justify-content-end">
                  <button onClick={this.props.onCollect} className="btn btn-success btn-lg">{collect_status}</button>
                </div>
              </div>
              <div className="col-8">
                <p className="align-middle">This button will trigger the incoming measurments to be inserted into the DB</p>
              </div>
            </div>
          </div>
          
          {/* Query Button */}
          <div className="container" id="db-button">
            <div className="row"  >
              <div className="col-4">
                <div className="d-flex justify-content-end">
                  <button onClick={this.props.onQuery} className="btn btn-danger btn-lg">Query</button> 
                </div>
              </div>
              <div className="col-8">
                <p>This button will query all the measurements taken from the DB</p>
              </div>
            </div>
          </div>
        </div>

        <hr/>

        {/* User */}
        <div className="container" id="db-query-container">
          
          {/* Username */}
          <div className="row align-items-start">
            <div className="col-4">
              <h2 className="text-end"><strong>User: </strong></h2>
            </div>
            <div className="col-8">
              <h2>{this.props.user.name}</h2>
            </div>
          </div>

          {/* Location */}
          <div className="row align-items-start">
            <div className="col-4">
              <h2 className="text-end"><strong>Location: </strong></h2>
            </div>
            <div className="col-8">
              <h2>{this.props.user.location}</h2>
            </div>
          </div>

          {/* Hardware */}
          <div className="row align-items-start">
            <div className="col-4">
              <h2 className="text-end"><strong>Hardware Status: </strong></h2>
            </div>
            <div className="col-8">
              <h2>{this.props.user.hardware.toString()}</h2>
            </div>
          </div>
          
          {/* Readings */}
          <div className="row align-items-start">
            <div className="col-4">
              <h2 className="text-end"><strong>Readings: </strong></h2>
            </div>
            <div className="col-7" id="readings-table">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">MAC</th>
                    <th scope="col">Time</th>
                    <th scope="col">Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.user.readings.map((reading, i) => 
                      <tr key={i}>
                        <th scope="row">{i}</th>
                          <td>{reading[0]}</td>
                          <td>{reading[1]}</td>
                          <td>{reading[2]}</td>
                      </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          {(this.props.user.readings.length > 1) 
            ? <div className="row align-items-start"><Line data={{labels: labels,datasets: [{label: 'Temperature', data: data, fill: false, backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgba(255, 99, 132, 0.2)',},],}} options={options}/></div>
            : null
          }
        </div>
      </div>
    );
  }
}
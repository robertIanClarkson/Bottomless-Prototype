import React, { Component } from 'react';
import './App.css';

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Description } from './components/Description';
import { SensorOverlay } from './components/SensorOverlay';
import { DatabaseInteractions } from './components/DatabaseInteractions';
import { Line } from '@reactchartjs/react-chart.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mac: 0,
      temp: 0,
      time: 0,
      collect: false,
      user: {
        name: "Name Not Set",
        location: "Location Not Set",
        hardware: "Hardware Not Set",
        readings: [["MAC Not Set", "Time Not Set", "Temp Not Set"]]
      }
    };
  }

  convertToFarhenheit(word) {
    let temp = word
    return temp
  }

  convertTo24hour(time) {
    return time
  }

  onCollect() {
    /* Send Post */
    let message = "";
    if(!this.state.collect) {// Collecting - Send start
      message = JSON.stringify({
        message: true
      });
    } else { // Not Collecting - Send stop
      message = JSON.stringify({
        message: false
      });
    }
    let requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': message.length
      },
      body: message
    };
    fetch('/temp/collect', requestOptions)
      .then((res) => {
        if(res.ok) {
          /* State Update */
          this.setState({
            collect: !this.state.collect
          })
        }
      })
  }

  onQuery() {
    fetch('/temp/query')
      .then(res => res.json())
      .then((result) => {
        // console.log(result)
        this.setState({
          user: {
            name: result.name,
            location: result.location,
            hardware: result.hardware,
            readings: result.readings
          }
        })
      })
  }

  componentDidMount() {
    setInterval(() => {
      fetch('/temp')
        .then(res => res.json())
        .then((data) => {
          // console.log(data)
          this.setState({
            mac: data.mac,
            temp: data.temp,
            time: this.convertTo24hour(data.time)
          })
        })
        .catch(err => console.log(err))
    }, 1000); 
  }
  
  

  render() {
    let labels = []
    // for(i = 0; i < this.state.users.)

    let data = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
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
      <div className="App">
        <Header/>
        <hr/>
        <SensorOverlay 
          mac={this.state.mac}
          temp={this.state.temp} 
          time={this.state.time}
        />
        <hr/>
        <DatabaseInteractions
          onCollect={this.onCollect.bind(this)}
          collect={this.state.collect}
          onQuery={this.onQuery.bind(this)}
          user={this.state.user}
        />
        <Line 
          data={{
            labels: this.state.user.readings,
            datasets: [
              {
                label: 'Temperature',
                data: this.state.user.readings,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
            ],
          }}
          options={options}
        />
        <hr/>
        <Description/>
        <hr/>
        <Footer/>

      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Description } from './components/Description';
import { SensorOverlay } from './components/SensorOverlay';
import { DatabaseInteractions } from './components/DatabaseInteractions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mac: 0,
      temp: 0,
      time: 0,
      collect: false
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
    this.setState({
      collect: !this.state.collect
    })
  }

  componentDidMount() {
    setInterval(() => {
      try {
        fetch('/temp')
          .then(res => res.json())
          .then((data) => {
            // console.log(data)
            this.setState({
              mac: data.mac,
              temp: this.convertToFarhenheit(data.temp),
              time: this.convertTo24hour(data.time)
            })
          });
      } catch(err) {
        console.log(err)
      }
      
    }, 1000); 
  }

  render() {
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
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
      temp: 0,
      time : 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetch('/temp')
        .then(res => res.json())
        .then((data) => {
          this.setState({
            temp: data.temp,
            time: data.time
          })
        });
    }, 1000); 
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <hr/>
        <h1>Current Temp</h1>
        <h3>{this.state.temp} at {this.state.time}</h3>
        <hr/>
        <SensorOverlay/>
        <hr/>
        <DatabaseInteractions/>
        <hr/>
        <Description/>
        <hr/>
        <Footer/>

      </div>
    );
  }
}

export default App;
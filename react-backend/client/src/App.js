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

  convertToFarhenheit(word) {
    let temp = word
    return temp
  }

  componentDidMount() {
    setInterval(() => {
      try {
        fetch('/temp')
          .then(res => res.json())
          .then((data) => {
            console.log(data)
            this.setState({
              temp: this.convertToFarhenheit(data.temp),
              time: data.time
            })
          });
      } catch(err) {
        console.log(err)
      }
      
    }, 2000); 
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <hr/>
        <SensorOverlay 
          temp={this.state.temp} 
          time={this.state.time}
        />
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
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
      users: []
    };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <hr/>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
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
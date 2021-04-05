import React from 'react';

export class DatabaseInteractions extends React.Component {
  render() {
    let collect_status = "NOT SET"
    if(this.props.collect) {
      collect_status = "Collecting"
    } else {
      collect_status = "Not Collecting"
    }

    return (
      <div>
        <h1>Database Interactions</h1>
        <button onClick={this.props.onCollect}>{collect_status}</button>
        <button onClick={this.props.onQuery}>Query</button>
        <hr/>
        <h2>User: {this.props.user.name}</h2>
        <h3>Location: {this.props.user.location}</h3>
        <h3>Hardware Status: {this.props.user.hardware.toString()}</h3>
        <h3>Readings:</h3>
        <ul>
          {this.props.user.readings.map((reading, i) => <li key={i}>MAC: {reading[0]} | Temp: {reading[1]} | Time: {reading[2]}</li>)}
        </ul>
      </div>
    );
  }
}
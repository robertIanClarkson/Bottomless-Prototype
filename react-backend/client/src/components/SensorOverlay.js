import React from 'react';

export class SensorOverlay extends React.Component {
  render() {
    return (
      <div>
        <h1>Sensor Overlay</h1>
        <h3>MAC: {this.props.mac}</h3>
        <h3>{this.props.temp} °C</h3>
        <h3>{(this.props.temp * 1.8) + 32} °F</h3>
        <h3>{this.props.time}</h3>
      </div>
    );
  }
}
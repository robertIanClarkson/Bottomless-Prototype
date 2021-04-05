import React from 'react';

export class SensorOverlay extends React.Component {
  render() {
    return (
      <div>
        <h1>Sensor Overlay</h1>
        <h3>MAC: {this.props.mac}</h3>
        <h3>{this.props.temp} °Foobar</h3>
        <h3>{this.props.time}</h3>
      </div>
    );
  }
}
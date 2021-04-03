import React from 'react';

export class SensorOverlay extends React.Component {
  render() {
    return (
      <div>
        <h1>Sensor Overlay</h1>
        <h3>It is {this.props.temp} in my apartment</h3>
        <h4>Timestamp: {this.props.time}</h4>
      </div>
    );
  }
}
import React from 'react';

export class SensorOverlay extends React.Component {
  render() {
    return (
      <div className="container" id="sensor-overlay-parent">
        <h1 id="section-title">Sensor Overlay</h1>
        <div className="container" id="sensor-overlay-container">
          <div className="row align-items-start">
            <div className="col-6">
              <h2 className="text-end"><strong>MAC: </strong></h2>
            </div>
            <div className="col-6">
              <h2>{this.props.mac}</h2>
            </div>
          </div>

          <div className="row align-items-start">
            <div className="col-6">
              <h2 className="text-end"><strong>Degrees: </strong></h2>
            </div>
            <div className="col-6">
              <h2>{this.props.temp} °</h2>
            </div>
          </div>

          <div className="row align-items-start">
            <div className="col-6">
              <h2 className="text-end"><strong>Time: </strong></h2>
            </div>
            <div className="col-6">
              <h2>{this.props.time}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
import React from "react";

export const Description = (props) => {
  return (
    <div className="container" id="description-container">
      <h1 id="section-title">Description</h1>
      <div className="row">
        <div className="col-8 offset-2">
          {/* Technologies */}
          <div className="container" id="description-subcontainer">
            <h2>This prototype uses:</h2>
            <ul>
              <li>AWS EC2 for website deployment</li>
              <li>AWS RDS for database deployment</li>
              <li>ExpressJS for backend</li>
              <li>Reactjs for frontend</li>
              <li>Bootstrap for styling</li>
              <li>MongoDB for database</li>
              <li>Raspberry Pi to interface with our sensor board</li>
            </ul>
          </div>
          
          <hr/>

          {/* How it works */}
          <div className="container" id="description-subcontainer">
            <h2>How it works?</h2>
            <ul>
              <li>Raspberry Pi reads sensor data off the sensor-board.</li>
              <li>Pi averages several iterations of data to increase its accuracy and precision.</li>
              <li>Pi uses TCP to send the averaged sensor data from my IP to the ExpressJS backend located on AWS servers.</li>
              <li>ExpressJS catches the sent data and forwards the data to the clients React frontend</li>
              <li>The client (you) clicks "Start Logging" button</li>
              <li>React sends request to Express to begin logging the sensor data</li>
              <li>Express now send the data to mongoDB and the user's react frontend</li>
              <li>data is caught by MongoDB server and stored</li>
              <li>The client (you) clicks "Stop Logging" button</li>
              <li>React sends request to Express to stop logging the sensor data and return with results</li>
              <li>Express catches message, stops sending data to MongoDB, but keeps sending data to react frontend</li>
              <li>Express preforms query of mongoDB for all the sensor data read and then sends said data to react frontend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
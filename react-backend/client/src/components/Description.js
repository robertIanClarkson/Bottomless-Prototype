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
              <li>ExpressJS for backend</li>
              <li>React for frontend</li>
              <li>Bootstrap for CSS styling</li>
              <li>Google Fonts</li>
              <li>ChartJS for charts</li>
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
              <li>Pi uses TCP to send the sensor data from my IP to the ExpressJS backend located on AWS servers (San Jose).</li>
              <li>ExpressJS catches the sent data and forwards the data to the client's(your) React frontend</li>
              <li>The client(you) clicks "Collecting" toggle button</li>
              <li>React sends request to ExpressJS to begin logging the sensor data</li>
              <li>ExpressJS now sends the data to both mongoDB and the client's(your) React frontend</li>
              <li>Data sent to the MongoDB server is stored in a NoSQL document for the user</li>
              <li>The client(you) clicks "Collecting" toggle button</li>
              <li>React sends request to Express to stop logging the sensor data</li>
              <li>Express catches message, stops sending data to MongoDB, but keeps sending data to react frontend</li>
              <li>The client (you) clicks "query"</li>
              <li>React send a request to ExpressJS to query all the data for the user</li>
              <li>Express preforms query of mongoDB for all the sensor data read and then sends said data to react frontend</li>
              <li>Queried data is available to the user in both its raw table readings and an interactive line chart</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
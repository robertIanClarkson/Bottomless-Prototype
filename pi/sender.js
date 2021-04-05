const os = require("os");
const http = require('http');
const i2c = require('i2c-bus');
const sensor = require('./sensor');

const mac = os.networkInterfaces().wlan0[0].mac;

function postData(data) {
  const options = {
    hostname: 'ec2-13-52-241-242.us-west-1.compute.amazonaws.com',
    port: 3001,
    path: '/temp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.write(data)
  req.end()
};

function run(refreshRate) {
  i2c.openPromisified(1)
    .then(sensor.initialize)
    .then((bus) => {
      setInterval(() => {
        sensor.readTemp(bus)
          .then((temp) => {
            data = JSON.stringify({
              mac: mac,
              temp: temp,
              time: new Date().toString()
            });
            
            postData(data);
          })
      }, refreshRate);
    })
    .catch(err => {
      console.log(err)
    })
}

refreshRate = 2000;
run(refreshRate);
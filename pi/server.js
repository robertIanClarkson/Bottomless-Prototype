const express = require('express');
const app = express();

const i2c = require('i2c-bus');

const accelAddress = 0x6B;
const xAddress = 0x28;
const yAddress = 0x2A;
const zAddress = 0x2C;

const readAccel = (sensor) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      sensor.readWord(accelAddress, xAddress),
      sensor.readWord(accelAddress, yAddress),
      sensor.readWord(accelAddress, zAddress)
    ])
    .then(([x, y, z]) => {
      console.log(x);
      console.log(y);
      console.log(z);
      resolve([x, y, z]);
    });
  });
}

app.get('/data', (req, res) => {
  i2c.openPromisified(1)
    .then(readAccel)
    .then((data) => {
      res.send(data)
    })
});

app.listen(3002, () => console.log('Gator app listening on port 3000!'));
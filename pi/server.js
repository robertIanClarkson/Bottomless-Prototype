const express = require('express');
const app = express();

const i2c = require('i2c-bus');

const accelAddress = 0x6B;
const x_l = 0x28;
const x_h = 0x29;
const y_l = 0x2A;
const y_h = 0x2B;
const z_l = 0x2C;
const z_h = 0x2D;

const CTRL_REG1_G  = 0x10;
const CTRL_REG2_G  = 0x11; 
const CTRL_REG3_G  = 0x12;
const CTRL_REG4    = 0x1E;
const CTRL_REG5_XL = 0x1F;
const CTRL_REG6_XL = 0x20;
const CTRL_REG7_XL = 0x21;
const CTRL_REG8    = 0x22;
const CTRL_REG9    = 0x23;
const CTRL_REG10   = 0x24;
const FIFO_CTRL    = 0x2E;

const initialize = (sensor) => {
  let set_g_xl_1  = 0xDB; 
  let set_g_xl_2  = 0x00;
  let set_g_xl_3  = 0x00;
  let set_g_xl_4  = 0x38;
  let set_g_xl_5  = 0x38; // 0x38
  let set_g_xl_6  = 0xD0; // 10hz=0x30 | 50hz=0x50 | 119hz=0x70 | 238hz=0x90 | 476hz=0xB0 | 952hz=0xD0 
  let set_g_xl_7  = 0x00;
  let set_g_xl_8  = 0x04;
  let set_g_xl_9  = 0x00;
  let set_g_xl_10 = 0x00;

  let fifo_ctrl = 0x00;

  return new Promise((resolve, reject) => {
    Promise.all([
      sensor.writeByte(accelAddress, CTRL_REG1_G,  set_g_xl_1),
      sensor.writeByte(accelAddress, CTRL_REG2_G,  set_g_xl_2),
      sensor.writeByte(accelAddress, CTRL_REG3_G,  set_g_xl_3),
      sensor.writeByte(accelAddress, CTRL_REG4,    set_g_xl_4),
      sensor.writeByte(accelAddress, CTRL_REG5_XL, set_g_xl_5),
      sensor.writeByte(accelAddress, CTRL_REG6_XL, set_g_xl_6),
      sensor.writeByte(accelAddress, CTRL_REG7_XL, set_g_xl_7),
      sensor.writeByte(accelAddress, CTRL_REG8,    set_g_xl_8),
      sensor.writeByte(accelAddress, CTRL_REG9,    set_g_xl_9),
      sensor.writeByte(accelAddress, CTRL_REG10,   set_g_xl_10),
      sensor.writeByte(accelAddress, FIFO_CTRL,    fifo_ctrl)
    ])
    .then(() => {
      resolve(sensor)
    })
  })
};

const convert = (lsb, msb) => {
  var result = ((msb & 0xFF) * 256 + (lsb & 0xFF))
  if (result > 32767) {
    result -= 65536
  }
  return result
}

const readAccel = (sensor) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      sensor.readByte(accelAddress, x_l),
      sensor.readByte(accelAddress, x_h),
      sensor.readByte(accelAddress, y_l),
      sensor.readByte(accelAddress, y_h),
      sensor.readByte(accelAddress, z_l),
      sensor.readByte(accelAddress, z_h)
    ])
    .then(([xl, xh, yl, yh, zl, zh]) => {
      resolve([convert(xl, xh), convert(yl, yh), convert(zl, zh)])
    })
  })
}

let isInitialized = false;
app.get('/data', (req, res) => {
  if(isInitialized) {
    i2c.openPromisified(1)
    .then(readAccel)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send("failed to read sensor")
    })
  } else {
    i2c.openPromisified(1)
    .then(initialize)
    .then(readAccel)
    .then((data) => {
      isInitialized = true
      res.send(data)
    })
    .catch((err) => {
      res.send("failed to read sensor")
    })
  }
});

app.listen(3002, () => console.log('Gator app listening on port 3000!'));
const i2c = require('i2c-bus');

const accelAddress = 0x6B;
const x_l = 0x28;
const x_h = 0x29;
const y_l = 0x2A;
const y_h = 0x2B;
const z_l = 0x2C;
const z_h = 0x2D;

const OUT_TEMP = 0x15;

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

function initialize(bus) {
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
      bus.writeByte(accelAddress, CTRL_REG1_G,  set_g_xl_1),
      bus.writeByte(accelAddress, CTRL_REG2_G,  set_g_xl_2),
      bus.writeByte(accelAddress, CTRL_REG3_G,  set_g_xl_3),
      bus.writeByte(accelAddress, CTRL_REG4,    set_g_xl_4),
      bus.writeByte(accelAddress, CTRL_REG5_XL, set_g_xl_5),
      bus.writeByte(accelAddress, CTRL_REG6_XL, set_g_xl_6),
      bus.writeByte(accelAddress, CTRL_REG7_XL, set_g_xl_7),
      bus.writeByte(accelAddress, CTRL_REG8,    set_g_xl_8),
      bus.writeByte(accelAddress, CTRL_REG9,    set_g_xl_9),
      bus.writeByte(accelAddress, CTRL_REG10,   set_g_xl_10),
      bus.writeByte(accelAddress, FIFO_CTRL,    fifo_ctrl)
    ])
    .then(() => {
      resolve(bus)
    })
  })
};

function readTemp(bus) {
  return new Promise((resolve, reject) => {
    bus.readWord(accelAddress, OUT_TEMP) 
      .then((temp) => {
        resolve(temp)
      })
  })
}

module.exports = {
  initialize,
  readTemp
}

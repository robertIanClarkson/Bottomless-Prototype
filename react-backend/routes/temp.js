var express = require('express');
var router = express.Router();

const http = require('http')

let static_data = {
  temp: 0,
  time: 0
};

let static_collect = false;

router.post('/', function(req, res, next) {
  static_data = req.body
  if(static_collect) {
    console.log("Collected")
  }
  res.sendStatus(200)
});

router.get('/', function(req, res, next) {
  json_data = JSON.stringify(static_data)
  res.send(json_data) 
});

router.post('/collect', function(req, res, next) {
  static_collect = req.body.message
  // console.log(`Collect: ${static_collect}`)
  res.sendStatus(200)
});

module.exports = router;

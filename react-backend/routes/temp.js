var express = require('express');
var router = express.Router();

const http = require('http')

let static_data = {
  temp: 0,
  time: 0
};

router.post('/', function(req, res, next) {
  static_data = req.body
  console.log(data)
  res.sendStatus(200)
});

router.get('/', function(req, res, next) {
  json_data = JSON.stringify(static_data)
  res.send(json_data) 
});

module.exports = router;

var express = require('express');
var router = express.Router();

const http = require('http')

let data = {
  temp: 0,
  time: 0
};

router.post('/', function(req, res, next) {
  data = req.body
  console.log(data)
  res.sendStatus(200)
});

router.get('/', function(req, res, next) {
  data.temp += 2;
  data.time += 2;
  foo = JSON.stringify(data)
  res.send(foo) 
});

module.exports = router;

var express = require('express');
var router = express.Router();

const http = require('http')

/* GET users listing. */
router.post('/', function(req, res, next) {
  data = req.body
  console.log(data)
  res.sendStatus(200)
});

module.exports = router;

var express = require('express');
var router = express.Router();

const http = require('http')

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("POST")
});

module.exports = router;

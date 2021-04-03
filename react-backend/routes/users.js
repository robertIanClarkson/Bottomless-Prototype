var express = require('express');
var router = express.Router();

const http = require('http')
const pi_options = {
  hostname: "10.0.0.105",
  port: 3002,
  path: '/data',
  method: 'GET'
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  http.get('http://10.0.0.105:3002/data', (apiRes) => {
    let rawDataBuffer = '';

    /* A chunk of data has been received from API. */
    apiRes.on('data', (chunk) => {
      rawDataBuffer += chunk;
    });

    /* Finished getting data from API */
    apiRes.on('end', () => {
      let jsonData = JSON.parse(rawDataBuffer);
      let temp = jsonData.temp
      res.json([{
        id: 1,
        username: temp
      }, {
        id: 2,
        username: "D0loresH4ze"
      }]);
    });
  }).on("error", (err) => {
    console.log(err)
  }); 
});

module.exports = router;

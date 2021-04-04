var express = require('express');
var router = express.Router();

const http = require('http')

var MongoClient = require("mongodb").MongoClient({ useUnifiedTopology: true });  

let static_data = {
  temp: 0,
  time: 0
};

let static_collect = false;

// db.users.update({"name" : "Robert C"}, {$push: {readings: "1"}})

function store() {
  MongoClient.connect("mongodb://localhost:27017/temp", function(err, db) {  
    if (err) throw err;
    var dbo = db.db("temp");
    var myquery = { name: "Robert C" };
    var newvalues = { $push: {readings: [static_data.time, static_data.temp]} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });  
  });
}
router.get('/test', function(req, res, next) {
  store();
  res.sendStatus(200);
});

router.post('/', function(req, res, next) {
  static_data = req.body
  if(static_collect) {
    store()
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

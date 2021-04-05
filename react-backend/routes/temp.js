var express = require('express');
var router = express.Router();

const http = require('http')

var MongoClient = require("mongodb").MongoClient({ useUnifiedTopology: true });  

let static_data = {
  mac: 0,
  temp: 0,
  time: 0
};

let static_collect = false;

// db.users.update({"name" : "Robert C"}, {$push: {readings: "1"}})
// db.users.insertOne({name:"Robert C", location:"San Francisco", hardware:true, readings:[]})

function store() {
  MongoClient.connect("mongodb://localhost:27017/temp", function(err, db) {  
    if (err) throw err;
    var dbo = db.db("temp");
    var myquery = { name: "Robert C" };
    var newvalues = { $push: {readings: [static_data.mac, static_data.time, static_data.temp]} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      db.close();
    });  
  });
}

function query() {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost:27017/temp", function(err, db) {
      if (err) throw err;
      var dbo = db.db("temp");
      dbo.collection("users").findOne({name: "Robert C"}, function(err, result) {
        if (err) throw err;
        db.close();
        resolve(result)
      });
    });
  })
  
}

router.get('/test', function(req, res, next) {
  query();
  res.sendStatus(200);
});

router.post('/', function(req, res, next) {
  static_data = req.body
  if(static_collect) {
    store();
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

router.get('/query', function(req, res, next) {
  query()
    .then((result) => {
      // console.log(result)
      res.send(result)
    })
})

module.exports = router;

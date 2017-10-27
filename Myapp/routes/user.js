var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var db
//mongodb://<dbuser>:<dbpassword>@ds041516.mlab.com:41516/onlineshoppingdb
MongoClient.connect('mongodb://lwam:Godisgood2017@ds041516.mlab.com:41516/onlineshoppingdb', function (err, database) {
    if (err) return console.log(err)
    db = database
})
/* GET ALL USERS*/
router.get('/', function (req, res, next) {
    db.collection('users').find().toArray(function (err, doc) {
        if (err) {
            console.log('Error fetching data from mongodb');
            res.send(err)
        }
        res.json(doc);
    });
});
/* GET ALL USERS BY ID*/
router.get('/byId/:id', function (req, res, next) {
    console.log('User request for : ' + req.params.id);
    db.collection('users').findOne({"_id": ObjectId(req.params.id)}, function (err, doc) {
        if (err) {
            console.log('Error fetching data from mongodb');
            res.send(err)
        }
        res.json(doc);
    });
});
/* GET ALL USERS BY EMAIL*/

router.get('/byEmail/:email', function (req, res, next) {
    console.log('User request for : ' + req.params.email);
    db.collection('users').findOne({"email": req.params.email}, function (err, doc) {
        if (err) {
            console.log('Error fetching data from mongodb');
            res.send(err)
        }
        res.json(doc);
    });
});

/* ADD  USER*/
router.post('/adduser', (req, res) => {
    console.log(req.body);

db.collection('users').save(req.body, (err, result) => {
    if (err) {
        console.log(err);
        res.send(err);
    }
 
    console.log('saved to database');


})
})


/* DELETE  USER BY EMAIL*/
router.delete('/delete/:email', (req, res) => {
   console.log('User request for : ' + req.params.email);

db.collection('users').remove({'email':req.params.email}, (err, result) => {
    if (err) {
        console.log(err);
        res.send(err);
    }
     console.log('deleted from database');
     res.json('OK');	
   })
})


/* UPDATE  USER BY EMAIL*/
router.put('/update/:email', (req, res) => {
    console.log(req.body);
  let userData={};
  userData.password=req.body.password;
  userData.userName=req.body.userName;
  userData.role=req.body.role;
  userData.email=req.body.email
  
//  let query={email:req.params.email}
db.collection('users').update({'email':req.params.email},userData, (err) => {
    if (err) {
        console.log(err);
        res.send(err);
    }
  
    console.log('updated to database');
   res.json('OK');

})
})

module.exports = router;
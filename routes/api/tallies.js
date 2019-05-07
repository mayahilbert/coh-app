const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Tally model
const Tally = require("../../models/Tally");
var mongodb   = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

router.route('/count/:owner').get(function(req, res) {
  var owner = req.params.owner;
var query = {};
query['owner_id'] = owner;

  Tally.aggregate(
      [
        { "$match" : query },
        { "$group": {
            "_id": "$tally_name",
            "count": { "$sum": 1 }
        }}      ],
        function(err, tallies) {
            if (err) {
                console.log(err);
            } else {
                res.json(tallies);
            }
  });
});

 router.route('/').get(function(req, res) {
    Tally.find(function(err, tallies) {
        if (err) {
            console.log(err);
        } else {
            res.json(tallies);
        }
    });
});

router.route('/:owner').get(function(req, res) {

  var owner = req.params.owner;
var query = {};
query['owner_id'] = owner;

   Tally.find(query, function(err, tallies) {
       if (err) {
           console.log(err);
       } else {
         console.log(tallies);
           res.json(tallies);
       }
   });
});

router.route('/tally/:id').get(function(req, res) {
  console.log("Req params id in router: " + req.params.id);
  _id = new ObjectId(req.params.id);
      Tally.findById(_id, function(err, tallies){
        console.log(tallies);
        if (err) {
            console.log(err);
        } else {
          console.log(tallies);
          res.json(tallies);
        }
      });
  });

router.route('/update/:id').post(function(req, res) {
    Tally.findOne({ "_id": req.params.id}, function(err, tally) {
        if (!tally)
            res.status(404).send("data is not found");
        else
            tally.tally_name = req.body.tally_name;
            tally.tally_time = req.body.tally_time;

            tally.save().then(tally => {
                res.json('Tally updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let tally = new Tally(req.body);
    tally.save()
        .then(tally => {
            res.status(200).json({'tally': 'tally added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new tally failed');
        });
});


router.route('/delete/:id').get(function (req, res) {
    Tally.findByIdAndRemove({_id: req.params.id}, function(err, tally){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;

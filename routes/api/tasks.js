const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Task model
const Task = require("../../models/Task");
var mongodb   = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

 router.route('/').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

router.route('/:owner').get(function(req, res) {

  var owner = req.params.owner;
var query = {};
query['owner_id'] = owner;

   Task.find(query, function(err, tasks) {
       if (err) {
           console.log(err);
       } else {
         console.log(tasks);
           res.json(tasks);
       }
   });
});


router.route('/task/:id').get(function(req, res) {
console.log("Req params id in router: " + req.params.id);
_id = new ObjectId(req.params.id);
    Task.findById(_id, function(err, tasks){
      console.log(tasks);
      if (err) {
          console.log(err);
      } else {
        console.log(tasks);
        res.json(tasks);
      }
    });
});

router.route('/update/:id').post(function(req, res) {
    Task.findOne({ "_id": req.params.id}, function(err, task){
        if (!task)
            res.status(404).send("data is not found");
        else
            task.task_name = req.body.task_name;
            task.task_user = req.body.task_user;
            task.task_time = req.body.task_time;

            task.save().then(task => {
                res.json('Task updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'task added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new task failed');
        });
});


router.route('/delete/:id').get(function (req, res) {
    Task.findByIdAndRemove({_id: req.params.id}, function(err, task){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;

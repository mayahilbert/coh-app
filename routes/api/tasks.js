const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Task model
const Task = require("../../models/Task");

 router.route('/').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(err, task) {
        res.json(task);
    });
});

router.route('/update/:id').post(function(req, res) {
    Task.findById(req.params.id, function(err, task) {
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

module.exports = router;

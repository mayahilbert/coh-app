const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
let TaskSchema = new Schema({
    task_name: {
        type: String
    },
    task_user: {
        type: String
    },
    task_time: {
        type: Date,
        default: Date.now
    },
    owner_id: {
      type: String
    }
});

module.exports = Task = mongoose.model('tasks', TaskSchema);

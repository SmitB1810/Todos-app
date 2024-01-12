const mongoose = require('mongoose');
const {Schema} = mongoose;

const TasksSchema = new Schema({

    taskTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Tasks = mongoose.model('tasks', TasksSchema);
module.exports = Tasks
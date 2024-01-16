const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks');
const Task = require('../models/Tasks');
const { check, validationResult } = require('express-validator');


router.get('/fetchalltasks', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


router.post('/addtask', [
    check('taskTitle').isLength({ min: 2 }),
    check('description').isLength({ min: 3 }),
    check('tag').isLength({ min: 1, max: 4 }),
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { taskTitle, description, tag } = req.body;
        const task = new Task({
            taskTitle: req.body.taskTitle,
            description: req.body.description,
            tag: req.body.tag
        })

        const saveTask = await task.save();
        res.json(saveTask);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


router.put('/updatetask/:id', [
    check('taskTitle').isLength({ min: 2 }),
    check('description').isLength({ min: 3 }),
    check('tag').isLength({ min: 1, max: 4 }),
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { taskTitle, description, tag } = req.body;
        const newTask = {};
        if (taskTitle) { newTask.taskTitle = taskTitle };
        if (description) { newTask.description = description };
        if (tag) { newTask.tag = tag };

        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        let taskt = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ taskt });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


router.delete('/deletetask/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    if (!task) { return res.status(404).send("Not Found") }

    task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
})


router.get('/search/:key', async (req, resp) => {
    const data = await Tasks.find({
        "$or": [
            { taskTitle: { $regex: req.params.key } },
            { description: { $regex: req.params.key } },
            { tag: { $regex: req.params.key } }
        ]
    })
    if (!data || data.length === 0) resp.status(400).send({ error: "No task was found" })
    resp.status(200).send(data)
})

module.exports = router
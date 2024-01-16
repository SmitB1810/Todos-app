// const connectTomongo = require('./db');
const express = require('express');
let cors = require('cors');
let app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/todos")
// connectTomongo();

app.use('/api/tasks', require('./routes/task'));
app.use('/api/users', require('./routes/user'));


app.listen(5000, ()=>{
  console.log("Working");
})
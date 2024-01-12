const mongoose = require('mongoose')

const mongoURL  = "mongodb://0.0.0.0:27017/todos";

const connectTomongo =()=>{
    mongoose.connect(mongoURL,(err)=>{
        if(err) console.log(err);
        else console.log("Database connected successfully!");
    })
}

module.exports=connectTomongo;
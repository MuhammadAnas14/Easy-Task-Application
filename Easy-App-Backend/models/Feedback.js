const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    feedbackFrom : {
        type: String,
    },
    feedbackTo:{
        type:String,
    },
    rating:{
        type:Number,
    },
    feedBack:{
        type:String,
    },
    taskId:{
        type:String,
    }
})

module.exports = mongoose.model('Feedback',feedbackSchema);
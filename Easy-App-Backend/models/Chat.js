const mongoose = require("mongoose");


const ChatSchema = new mongoose.Schema({

    workerId:{
        type:String
    },
    ChatTime: {
        type: String,
      },
    PosterId:{
        type:String
    },
    workername:{
        type:String
    },
    postername:{
        type:String
    },
    posterpic:{
        type:String
    },
    workerpic:{
        type:String
    }
})

module.exports = mongoose.model("ChatStart", ChatSchema);
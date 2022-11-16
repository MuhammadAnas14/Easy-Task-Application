const mongoose = require("mongoose");


const LocationSchema = new mongoose.Schema({

    workerId:{
        type:String
    },
    PosterId:{
        type:String
    },
    longitude:{
        type:String
    },
    latitude:{
        type:String
    },
    Arrived :{ 
        type:String,
        default:"NO",
    },
    TaskID:{
        type:String
    }
})

module.exports = mongoose.model("Locations", LocationSchema);
const mongoose = require("mongoose");


const OtpSchema = new mongoose.Schema({


    userId: {
        type:String,
    },
    otp : {
        type:String,
    },
    expirationTime: { 
        type: Date,
    },
    mail : {
        type:String,
        default: "",
    }
})

module.exports = mongoose.model("Otp", OtpSchema);

const mongoose = require("mongoose");


const ContactUsSchema = new mongoose.Schema({

    userId:{
        type:String
    },
    name: {
        type:String
    },
    email: {
        type: String,
      },
    massage:{
        type:String
    }
})

module.exports = mongoose.model("ContactUs", ContactUsSchema);
const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({

    sender:{
        type:String
    },
    reciever: {
        type: String,
      },
      messages: [
        {
          _id: {
              type: String
            }, //message_id
          text: {
              type: String
            }, //message_content
          createdAt:{
              type: String
            }, //message_creation_time
          user: {
            _id: {
                type:String
            }, //sender_id
            name: {
                type:String
            }, //sender_name
            avatar: {
                type:String
            } //sender_photo
          },
        }
      ]
})

module.exports = mongoose.model("MessageSchema", MessageSchema);
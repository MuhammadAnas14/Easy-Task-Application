const mongoose = require("mongoose")


const TaskSchema = new mongoose.Schema({

    userId: {
        type :String
    },
    userName: { 
        type :String
    },
    userPhoto :{ 
        type : String
    },
    category: {
        type: String
    },
    taskName: {
        type:String,
    },
    taskDescription: {
        type: String,
    },
    taskBudget: {
        type : String,
    },
    taskCompletionDate : { 
        type:Date
    },
    taskLocation: {
        type: String,
        default: "",
    },
    taskType: {
        type:String
    },
    taskMethod : {
        type:String,
        default: ""
    },
    status: {
        type: String ,
        default: "0.17"
    },
    totalbids:{
        type: Number,
        default:0,
    },
    bids:[{
            TaskId:String,
            Username: String,
            Bid:String,
            UserId:String,
            latitude:String,
            longitude:String,
            totalReviews:Number,
            userRating:Number,
            createdAt:{
                type:Date,
                default:Date.now()
            }
    }],
    latitude: {
        type:String,
        default: "",
    },
    longitude: {
        type:String,
        default: "",
    },
    taskAssignTo: {
        type:String,
        default: ""
    },
    acceptedBid: {
        type:String,
        default: "",
    },
    paymentMethod: {
        type:String,
    },
    paymentStatus: {
        type:String,
        default: "processing",
    },
})

module.exports = mongoose.model("Task", TaskSchema);



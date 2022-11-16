const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({

    TaskId: {
        type: String, 
    },
    paymentById: {
        type: String,
    },
    paymentByName: {
        type:String,
    },
    paymentToId:{
        type:String,
    },
    paymentToName: {
        type:String,
    },
    paymentAmount:{
        type:String,
    },
    paymentMethod:{
        type:String,
    },
    CardNumber:{
        type:String,
        default:""
    },
    CardName:{
        type:String,
        default:"",
    },
    CardExpiry:{
        type:String,
        default:"",
    },
    
    })

    module.exports = mongoose.model("Payment", PaymentSchema);
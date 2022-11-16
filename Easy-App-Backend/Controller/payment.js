const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Task = require('../models/task');
const Payment = require('../models/payment');
const User = require("../models/user");

exports.CodPayment = asyncHandler(async (req, res, next) => {
    const {
        TaskID,
        UserId,
        UserName,
        AssignedToId,
        amount,
        method
    } = req.body;
    console.log(req.body);

    const user =await User.findOne({_id:AssignedToId}).select("firstName");
    console.log("user", user);
    
    const payment = await Payment.create({
        TaskId: TaskID,
        paymentById: UserId,
        paymentByName: UserName,
        paymentToId: AssignedToId,
        paymentToName: user.firstName,
        paymentAmount:  amount,
        paymentMethod: method,
    });

    const updatePaymentStatus = await Task.findOne({_id: TaskID}).select("status").select("paymentStatus")
    updatePaymentStatus.paymentStatus = "paid";
    await updatePaymentStatus.save();
    console.log(updatePaymentStatus)
    await payment.save();
    
    res.status(200).json({
        success: true,
        message: "payment done Successfully"
    });
})

exports.CardPayment = asyncHandler(async (req, res, next) => {

    const {
        TaskID,
        UserId,
        UserName,
        AssignedToId,
        amount,
        method,
        cardName,
        cardNumber,
        cardExpiry,
    } = req.body;


    const user =await User.findOne({_id:AssignedToId}).select("firstName");
    console.log("user", user);
    
    const payment = await Payment.create({
        TaskId: TaskID,
        paymentById: UserId,
        paymentByName: UserName,
        paymentToId: AssignedToId,
        paymentToName: user.firstName,
        paymentAmount:  amount,
        paymentMethod: method,
        CardNumber: cardNumber,
        CardName: cardName,
        CardExpiry: cardExpiry,
    });

    const updatePaymentStatus = await Task.findOne({_id: TaskID}).select("status").select("paymentStatus")
    updatePaymentStatus.paymentStatus = "paid";
    await updatePaymentStatus.save();
    console.log(updatePaymentStatus)
    await payment.save();
    
    res.status(200).json({
        success: true,
        message: "payment done Successfully"
    });

})

exports.getPayment = asyncHandler(async (req, res, next) => {

    const {userId} = req.body;

    const payment = await Payment.find({paymentById: userId}).select("paymentToName").select("paymentAmount").select("paymentMethod");

    console.log("Payment", payment);

    res.status(200).json({
        success: true,
        message: "payment get success",
        payment
    });
})  


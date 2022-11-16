const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Feedback = require("../models/Feedback");
const Task = require('../models/task');

exports.GiveFeedback = asyncHandler(async (req, res, next) => {
    const {
        FeedbackFrom,
        Rating,
        feedback,
        TaskID,
        FeedbackTo
    } = req.body;
    
    const NewFeedBack = await Feedback.create({
        feedbackFrom: FeedbackFrom,
        feedbackTo: FeedbackTo,
        rating: Rating,
        feedBack: feedback,
        taskId: TaskID
    });

    const updatePaymentStatus = await Task.findOne({_id: TaskID}).select("status").select("paymentStatus")
    console.log(updatePaymentStatus)
    
    updatePaymentStatus.paymentStatus = "Completed";
    await updatePaymentStatus.save();
    await NewFeedBack.save();
    
    res.status(200).json({
        success: true,
        message: "feedback Posted Successfully"
    });
}); 

exports.GetRating = asyncHandler(async (req, res, next) => {
    const {
        UserId
    }= req.body;

    console.log(req.body)

    const Rating = await Feedback.find({feedbackTo: UserId}).select("rating");
    let UserRating= 0;
    let TotalReviews = 0;

    if (Rating.length > 0) {
        for (let i = 0; i < Rating.length; i++) {
            UserRating = UserRating + Rating[i].rating
        }
        UserRating = UserRating / Rating.length;
        TotalReviews = Rating.length;
    }
    res.status(200).json({
        success: true,
        message: "Rating Fetched Successfully",
        UserRating: UserRating,
        TotalReviews: TotalReviews,
    });
});
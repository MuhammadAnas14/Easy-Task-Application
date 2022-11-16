const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Task = require('../models/task');
const Feedback = require('../models/Feedback');

exports.OnlineTask = asyncHandler(async (req,res,next) => {

    const {UserId, UserName ,UserPhoto ,Category ,task_name ,TaskBudget, 
        task_discription , TaskDate ,Type, PaymentMethod} = req.body;

    const task = await Task.create({
        userId: UserId,
        userName: UserName,
        userPhoto:UserPhoto,
        category :Category,
        taskName: task_name,
        taskDescription : task_discription,
        taskBudget : TaskBudget,
        taskCompletionDate: TaskDate,
        taskType : Type,
        paymentMethod: PaymentMethod
      });

    await task.save()
    

    res.status(200).json({
        success : true,
        message : "task Posted Successfully"
    })

} )

exports.ScheduledTask = asyncHandler(async (req,res,next) => {

    const {UserId, UserName ,UserPhoto ,Category ,task_name ,TaskBudget, task_discription , TaskDate ,Type ,method ,city,country,longitude,latitude ,PaymentMethod} = req.body;

    const task = await Task.create({
        userId: UserId,
        userName: UserName,
        userPhoto:UserPhoto,
        category :Category,
        taskName: task_name,
        taskDescription : task_discription,
        taskBudget : TaskBudget,
        taskCompletionDate: TaskDate,
        taskType : Type,
        taskMethod: method,
        taskLocation:  city + "," + country,
        latitude:latitude,
        longitude:longitude,
        paymentMethod: PaymentMethod,
      });

    await task.save()

    res.status(200).json({
        success : true,
        message : "task Posted Successfully"
    })

} )


exports.HomeTasks = asyncHandler(async (req,res,next)=>{
  
    const collection = await Task.find({})

    if(!collection){
        ErrorResponse("Network Error");
    }

    res.status(200).json({
        success : true,
        message : "task Posted Successfully",
        data: collection,
    })
})

exports.LiveTask = asyncHandler(async (req,res,next) => {

    const {UserId, UserName ,UserPhoto ,Category ,task_name ,TaskBudget, task_discription , TaskDate ,Type ,method ,Location,city,country,longitude,latitude,PaymentMethod } = req.body;

    const task = await Task.create({
        userId: UserId,
        userName: UserName,
        userPhoto:UserPhoto,
        category :Category,
        taskName: task_name,
        taskDescription : task_discription,
        taskBudget : TaskBudget,
        taskCompletionDate: TaskDate,
        taskType : Type,
        taskMethod: method,
        taskLocation:  city + "," + country,
        latitude:latitude,
        longitude:longitude,
        paymentMethod: PaymentMethod
      });

    await task.save()

    res.status(200).json({
        success : true,
        message : "task Posted Successfully"
    })

})

exports.MyTask = asyncHandler(async(req,res,next) => {

    const { UserId } = req.body;
    
    // const UserTask = await Task.find({$or :[{userId: UserId},{taskAssignTo:UserId}]})
    // .exec(function(err, collection) {
    //     if(err){
    //         return next(ErrorResponse("Network Error"));
    //     }
    //     console.log(collection);
    //     res.status(200).json({
    //         success: true,
    //         message: "ALL User Task",
    //         collection
    //     })
    // });

    const UserTask = await Task.find({userId: UserId})

    res.status(200).json({
        success: true,
        message: "ALL User Task",
        UserTask
    })
    
})


exports.Bids = asyncHandler(async(req,res,next) => {

    const { TaskId,UserId,Username,Bid,latitude,longitude } = req.body;
    // const BidData = {TaskId:TaskId,Username:Username,Bid:Bid,UserId:UserId,longitude:longitude,latitude:latitude}
    
    const UserTask = await Task.findOne({_id: TaskId}).select("totalbids")
    UserTask.totalbids = UserTask.totalbids + 1 ;
    await UserTask.save()

    const Rating = await Feedback.find({feedbackTo: UserId}).select("rating");
    let UserRating= 0.0;
    let TotalReviews = 0;

    if (Rating.length > 0) {
        for (let i = 0; i < Rating.length; i++) {
            UserRating = UserRating + Rating[i].rating
        }
        UserRating = UserRating / Rating.length;
        TotalReviews = Rating.length;
    }

    const BidData = {TaskId:TaskId,Username:Username,Bid:Bid,UserId:UserId,longitude:longitude,latitude:latitude,userRating:UserRating,totalReviews:TotalReviews}

    await Task.updateOne({_id :TaskId},
         {$push: {
            bids:BidData
        }},{new:true}).exec()
        
    res.status(200).json({
        success : true,
        message : "task Posted Successfully",
        UserTask
    })
})

exports.DeleteBid = asyncHandler(async(req,res,next)=>{

    const {TaskId,Username,Bid,_id} = req.body

    await Task.updateOne({_id :TaskId},
        {$pull: {
          bids: {_id : _id}
       }},{new:true}).exec()
   

    res.status(200).json({
        success : true,
        message : "task Posted Successfully",
        UserTask
    })
})

exports.AcceptBid = asyncHandler(async(req,res,next)=>{

    const {TaskId,UserId,Bid} = req.body

    console.log(req.body)
    const UserTask = await Task.findOne({_id: TaskId}).select("status").select("taskAssignTo").select("acceptedBid")
    UserTask.status = "0.25" ;
    UserTask.taskAssignTo = UserId ;
    UserTask.acceptedBid = Bid ;
    await UserTask.save()

    res.status(200).json({
        success : true,
        message : "task Accepted Successfully",
    })
})

exports.CompleteTask = asyncHandler(async(req,res,next)=>{

    const {TaskId} = req.body;
    const UserTask = await Task.findOne({_id: TaskId}).select("status").select("paymentStatus")
    UserTask.status = "0.35" ;
    UserTask.paymentStatus = "pending";
    await UserTask.save()

    res.status(200).json({
        success:true,
        message:"Task Completed Successfully"
    })
})


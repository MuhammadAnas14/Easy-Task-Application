const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const ChatStart = require('../models/Chat');
const User = require("../models/user");
const Task = require('../models/task');
const MessageSchema = require('../models/Messages');

exports.ChatLog = asyncHandler(async (req,res,next) => {

    const {UserId, Chattime ,chatWith} = req.body;

    const Logs = await ChatStart.findOne({$or: [
        {workerId: UserId, PosterId:chatWith},
        {PosterId: chatWith, PosterId:UserId},
    ]});
    console.log("seeing logs", Logs)
    if(Logs === null){
        console.log("creating");
        let posterName = await User.findOne({_id:chatWith}).select("firstName").select("picture");
        let workerName = await User.findOne({_id:UserId}).select("firstName").select("picture");

        const chat = await ChatStart.create({
        workerId: UserId,
        ChatTime: Chattime,
        PosterId: chatWith,
        workername: workerName.firstName,
        postername: posterName.firstName,
        posterpic: posterName.picture,
        workerpic: workerName.picture,
      });

    await chat.save()
    res.status(200).json({
        success : true,
        message : "task Posted Successfully"
    })
    }
    else{   
        console.log("found")
        res.status(200).json({
            success : true,
            message : "task Posted Successfully"
        })
        return 
}

    

} )

exports.GetLog = asyncHandler(async (req,res,next) => {

    const {UserId} = req.body;
    console.log(UserId);

    const ChatLogs = await ChatStart.find({$or: [
        {workerId: UserId},
        {PosterId:UserId},
    ]});
    // let Data = await User.find({_id: UserID}).select("firstName").select("picture");

     console.log(ChatLogs);

    res.status(200).json({
        success : true,
        message : "task Posted Successfully",
        ChatLogs
    })

} )

exports.Messages = asyncHandler(async (req,res,next) => {
    console.log(req.body);


    const MessLogs = await MessageSchema.findOne({$or: [
        { reciever: req.body.reciever, sender: req.body.sender },
        { reciever: req.body.sender, sender: req.body.reciever }
    ]});

    if(MessLogs === null){
        const chat = await MessageSchema.create({
            sender: req.body.sender,
            reciever: req.body.reciever,
            messages: req.body.messages
          });

        const data = chat.messages
     console.log(messages);
     await chat.save()
    
     res.status(200).json({
        success : true,
        message : "task Posted Successfully",
    })
    }
    else{
        const chat = await MessageSchema.updateOne(
            {
              $or: [
                { reciever: req.body.reciever, sender: req.body.sender },
                { reciever: req.body.sender, sender: req.body.reciever }
              ]
            },
            { $push: { messages: req.body.messages } },{new:true}).exec()
    
        await chat.save()
        
    
    res.status(200).json({
            success : true,
            message : "task Posted Successfully",
        })
    }

} )

exports.sendMessages = asyncHandler(async (req,res,next) => {
    console.log(req.body);

    const MessLogs = await MessageSchema.findOne({$or: [
        { reciever: req.body.reciever, sender: req.body.sender },
        { reciever: req.body.sender, sender: req.body.reciever }
    ]});

    if (MessLogs === null ){
        res.status(200).json({
            success : true,
            message : "Empty Chat",
        })
    }
    else{
        res.status(200).json({
            success : true,
            message : "Empty Chat",
            MessLogs
        })
    }
})

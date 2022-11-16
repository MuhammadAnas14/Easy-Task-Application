const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const LocationSave = require('../models/LocationSave');
const Task = require('../models/task');

exports.LocationSaver = asyncHandler(async (req,res,next) => {

    const {workerId ,posterId,longitude,latitude,TaskId } = req.body;
    console.log(req.body);

    const Locations = await LocationSave.findOne({$and: [
        {workerId: workerId},
        {PosterId: posterId},
        {TaskID: TaskId}
    ]});
    
    console.log(Locations)

    if (Locations == null){
        const location = await LocationSave.create({
            workerId: workerId,
            PosterId: posterId,
            longitude: longitude,
            latitude: latitude,
            TaskID: TaskId,
          });
    
        await location.save()

        // console.log(location)
    }

    else{
        Locations.latitude= latitude;
        Locations.longitude = longitude;
        console.log("cew")
        await Locations.save()
    }
    
    // console.log(Locations)

    res.status(200).json({
        success : true,
        message : "task Posted Successfully",
    })

} )

exports.GetLocation = asyncHandler(async (req,res,next) => {

    const {workerId ,posterId,TaskId} = req.body;
    console.log(req.body);

    const Locations = await LocationSave.findOne({$and: [
        {workerId: workerId},
        {PosterId: posterId},
        {TaskID: TaskId}
    ]});

    console.log(Locations)

    if (Locations){
        const foundLocation = {
            longitude:Locations.longitude,
            latitude: Locations.latitude
        }
        res.status(200).json({
            success : true,
            message : "task1 Posted Successfully",
            foundLocation
        })
    }
    else{
        console.log("no location found")
        let foundLocation = ""
        res.status(200).json({
            success : true,
            message : "task Posted Successfully",
            foundLocation
        })
    }
    

} )

exports.Arrived = asyncHandler(async(req,res,next)=>{

    const {TaskId,Arrived,workerId,posterId} = req.body;

    const UserTask = await Task.findOne({_id: TaskId}).select("status").select("paymentStatus")
    UserTask.status = "0.30" ;
    await UserTask.save()
    console.log(UserTask)

    const Locations = await LocationSave.findOne({$and: [
        {workerId: workerId},
        {PosterId: posterId}
    ]});

    console.log(Locations)

    Locations.Arrived = Arrived

    Locations.save()

    res.status(200).json({
        success:true,
        message:"ARRIVED"
    })
})


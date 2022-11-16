const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");

exports.GetAllUsers = asyncHandler(asyncHandler(async(req,res,next)=> {

    const  user = await User.find({}).select("firstName").select("lastName").select("email").select("phone")

    console.log(user.length)

    res.status(200).json({
        success: true,
        massage: "Users get",
        user
      });
}))
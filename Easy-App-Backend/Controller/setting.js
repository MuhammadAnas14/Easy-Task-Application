const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");
const ContactUs = require("../models/contactUs")

exports.ChangePassword = asyncHandler(async (req, res, next) => {

  const { UserId, OldPassword, NewPassword } = req.body;

  if (!UserId) {
    return next(new ErrorResponse("Invalid User"));
  }

  let user = await User.findOne({ _id: UserId });

  if (!user) {
    return next(new ErrorResponse("Invalid User"));
  }
  console.log(user._id);

  const isMatch = await user.matchPassword(OldPassword);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Old Password", 401));
  }

  user.password = NewPassword
  await user.save();

  res.status(200).json({
    success: true,
    massage: "Password Updated",
  });
});

exports.ContactUs = asyncHandler(async(req,res,next)=>{

    const { UserId, Name, Email ,Massage } = req.body;

    if (!UserId) {
        return next(new ErrorResponse("Invalid User"));
      }

    await ContactUs.create({

      userId : UserId,
      name:Name,
      email:Email,
      massage:Massage
    })

    res.status(200).json({
      success: true,
      massage: "Massage Save",
    });
    


})

exports.Images = asyncHandler(async(req,res,next)=>{
  const {Img,Id} = req.body


  if(!Img){
    return next(new ErrorResponse("Base 64 not found"));
  }
  
  if (!Id) {
    return next(new ErrorResponse("Please provide with an userID"));
  }


  const UserDB = await User.findOne({_id:Id});
  UserDB.picture = Img;
  await UserDB.save();
  
  res.status(200).json({
    success:true,
    message:"Image Saved",
    UserDB,
  });

})
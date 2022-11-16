const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");
const sendTokenResponse = require("../middleware/tokenGenerate")
const sendSms = require("../middleware/twilio");
const GenerateOtp = require("../middleware/generateOtp");
const { PhoneMessage } = require("../middleware/messagetemplate");
const ReOtpGenerate = require("../middleware/NewOtpReplace");
const MailSender = require("../middleware/Mailing");
const EmailOtpGenerate = require("../middleware/EmailOtpGenerate")
const OTP = require("../models/otp");
const Mail = require("nodemailer/lib/mailer");

exports.SignUp = asyncHandler(async (req, res, next) => {
 
  const { FirstName, LastName, Email, Password, Phone } = req.body;

  const userEmail = await User.findOne({email: Email});

  if (userEmail) {
    return next(
      new ErrorResponse("User already exit", 400)
    );
  }


  const user = await User.create({
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    password: Password,
    phone: Phone,
  });

  const userID = user._id.toString();

  const phoneNumber = user.phone;

  const otpforphone = await GenerateOtp(userID);

  
  const massage = PhoneMessage(otpforphone);

  const smsSuccess = await sendSms(phoneNumber, massage);


  if(!smsSuccess.success){
    return next(
    new ErrorResponse(smsSuccess.message, 400)
  
    )}

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {

  const { Email, Password } = req.body;


  //validate
  if (!Email || !Password) {
    return next(
      new ErrorResponse("Please provide ana email and passward", 400)
    );
  }

  const user = await User.findOne({email: Email});


  if (!user) {
    return next(new ErrorResponse("Invalid credential ", 400));
  }
  //passward match
  const isMatch = await user.matchPassword(Password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credential", 400));
  }

  sendTokenResponse(user, 200, res);
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  
  const { Email, NewPassword } = req.body;

  if (!Email) {
    return next(
      new ErrorResponse("Please provide with an email to change the password")
    );
  }
  const changePassword = { password: NewPassword };

  let user = await User.findOne({ email: Email });

  user.password = NewPassword;

  await user.save();


  res.status(200).json({
    success: true,
    massage: "Password Updated",
  });
});

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  var currentDate = new Date();

  const {userId, otp} = req.body;

  console.log("ee",req.body)

  if (!otp) {
    return next(new ErrorResponse("Please provide with an otp"));
  }

  if (!userId) {
    return next(new ErrorResponse("Please provide with an userID"));
  }

  const otp_instance = await OTP.findOne({userId});
  const user = await User.findOne({_id:userId})
  // const user = await User.findByIdAndUpdate(userId,{Phoneverify:true})

  var value = currentDate.getTime() - otp_instance.expirationTime;
  var min = Math.floor((value / 1000 / 60) << 0);

    if (min <= 0) {
      if (otp == otp_instance.otp) {
        user.Phoneverify = true;
        await user.save()

        res.status(200).json({
          success: true,
          massage: "otp verified",
        });

      }
      else if(otp == otp_instance.mail){
        user.Emailverify = true;
        await user.save()

        res.status(200).json({
          success: true,
          massage: "otp verified",
        });
      }
       else {
        return next(new ErrorResponse("Please provide correct otp"));
      }
    } else {
      return next(new ErrorResponse("verification time expire"));
    }
});

exports.otpReplace = asyncHandler(async (req, res, next) => {

  const {userId,phoneNo}  = req.body;

  console.log(req.body)

  if (!userId) {
    return next(new ErrorResponse("Please provide with an userID"));
  }

  if (!phoneNo) {
    return next(new ErrorResponse("Please provide with an Phone"));
  }

  const OptAndTime = await ReOtpGenerate();

  const otpFind =  await OTP.findOne({userId});

  const massage = PhoneMessage(OptAndTime.otpNew);

  const smsSuccess = await sendSms(phoneNo, massage);


  if(!smsSuccess.success){
    return next(
    new ErrorResponse(smsSuccess.message, 400)
  
    )}

  
  otpFind.otp= OptAndTime.otpNew
  otpFind.expirationTime = OptAndTime.Time;


  const UpdatedDb = await otpFind.save();


  res.status(200).json({
    success: true,
    massage: "otp verified",
  });

});


exports.EmailOTP = asyncHandler(async (req, res, next) => {
  console.log("EMAIL REQ HANDLER", req.body);
  const userId = req.body.Id;
  const email = req.body.Email;
  if (!userId) {
    return next(new ErrorResponse("Please provide with an userID"));
  }

  if (!email) {
    return next(new ErrorResponse("Please provide with an Email"));
  }
  //Generating OTP
  const OtpTime = await EmailOtpGenerate();  
  
  //Mailing OTP
  const OTPMAIL = OtpTime.mail;
  const TIME = OtpTime.Time

  //Mailing Req
  const data = {Email: email, OTP:OTPMAIL}
  MailSender(data,res,userId,OTPMAIL,TIME);
  
});

exports.Deleteuser = asyncHandler(async(req,res,next)=>{

  let deleteuser = await User.findOne({_id:req.body.userId}).remove().exec();

  console.log(deleteuser);

  res.status(200).json({
    success: true,
    massage: "otp verified",
  });
})

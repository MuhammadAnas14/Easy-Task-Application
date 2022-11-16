const nodemailer = require('nodemailer');
const isEmailValid = require('../middleware/emailvalidation')
const OTP = require("../models/otp");
const ErrorResponse = require("../utils/ErrorResponse");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fypeasyapp@gmail.com',
    pass: 'sudoeasyapp2021',
  }
});


async function MailSender(data,res,userId,OTPMAIL,TIME) {
  const {
    valid
  } = await isEmailValid(data.Email);

  let mailOptions = {
    from: 'fypeasyapp@gmail.com',
    to: `${data.Email}`,
    subject: `If you see this email your email is weird,
     We were just testing weird usernames to see the rejection
      (Dumb get a good one)`,
    html: `Your OTP is ${data.OTP}`,
  };
  console.log("seeing valid", valid)
  if (valid) {
    await transporter.sendMail(mailOptions,async function (err, info) {
      if (err) {
        console.log("Error is", err)
        res.status(400).json({ 
          success:false,
          message:"Server Error Pleaase try again"})
        }
         else {
        console.log("Info is", info)
        // verify = {
        //   success: true,
        //   message: "Email Send Successfully, Please verify with the OTP",
        // };
        //Saving In DB
        const otp_instance = await OTP.findOne({
          userId
        });
        otp_instance.mail = OTPMAIL;
        otp_instance.expirationTime = TIME;
        await otp_instance.save()

        res.status(200).json({
          success: true,
          message: "Email send, Plz verify"
        })
      }
    });
  } else {
    // verify = {
    //   success: false,
    //   message: "Email Doesn't exist. Please provide correct Email"
    // }
    res.status(400).json({ 
      success:false,
      message:"Email not exist Please provide correct email"})
  }
  // return verify;
}

module.exports = MailSender
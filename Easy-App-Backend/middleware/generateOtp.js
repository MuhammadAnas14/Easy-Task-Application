const otpGenerator = require('otp-generator');
const Otp = require("../models/otp")


function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }
  

async function OtpGenerate(UserId){

  const otp = otpGenerator.generate(5, { alphabets: false, upperCase: false, specialChars: false });
  const now = new Date();
  const expiration_time = AddMinutesToDate(now,10);
  
  
  //Create OTP instance in DB
  const otp_instance = await Otp.create({
    userId: UserId,
    otp: otp,
    expirationTime: expiration_time
  });

  console.log("Firts Otp is :",otp)

  return otp
}

module.exports =  OtpGenerate
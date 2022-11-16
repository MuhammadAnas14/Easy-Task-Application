const otpGenerator = require('otp-generator');
const Otp = require("../models/otp")


function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}


async function ReOtpGenerate(){

  const otp = otpGenerator.generate(5, { alphabets: false, upperCase: false, specialChars: false });
  const now = new Date();
  const expiration_time = AddMinutesToDate(now,10);

  console.log("Firts Otp is :",otp)
  const data = {otpNew:otp,
                Time:expiration_time}
  return data;
}

module.exports =  ReOtpGenerate
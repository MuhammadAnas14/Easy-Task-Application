const PhoneMessage = (otp) =>{
    return `Dear User,\n`
    + `${otp} is your otp for Easy App. Please enter the OTP to verify your phone number.\n`
    + `Regards\n`
    + `Admin`
}
const subject_mail = "OTP: For Email Verification"



const EmailMessage = (otp) =>{
     return `Dear User, \n\n` 
      + 'OTP for your email verification is : \n\n'
      + `${otp}\n\n`
      + 'This is a auto-generated email. Please do not reply to this email.\n\n'
      + 'Regards\n'
      + 'Divyansh Agarwal\n\n'
}

module.exports={subject_mail,EmailMessage, PhoneMessage}

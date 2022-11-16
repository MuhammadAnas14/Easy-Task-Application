const express = require('express')

const router  = express.Router();

const {SignUp, login, forgetPassword, verifyOtp,otpReplace, EmailOTP,Deleteuser} = require('../Controller/auth')

router.post("/signUp", SignUp);
router.post("/login" , login);
router.put("/forgetPassword",forgetPassword);
router.post("/verifyOtp",verifyOtp);
router.post("/otpReplace",otpReplace);
router.post("/EmailOtp",EmailOTP)
router.post('/deleteAccount',Deleteuser)

module.exports = router;
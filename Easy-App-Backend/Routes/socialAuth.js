const express = require('express')

const router  = express.Router();

const {googleLogin,facebookLogin} = require('../Controller/socialAuth')


router.post("/GoogleLogin", googleLogin);
router.post("/FacebookLogin" , facebookLogin);


module.exports = router;
const express = require('express')

const router  = express.Router();

const {ChangePassword ,ContactUs,Images} = require('../Controller/setting')

router.put('/changePassword' ,ChangePassword)
router.post('/contactUsMassage',ContactUs)
router.put('/Images',Images)


module.exports = router;
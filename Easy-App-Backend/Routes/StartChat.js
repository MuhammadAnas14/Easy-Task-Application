const express = require('express')

const router  = express.Router();

const {ChatLog, GetLog, Messages,sendMessages} = require('../Controller/Chats')

router.post("/ChatLog", ChatLog);
router.post("/GetLog",GetLog);
router.post("/MessageLogs",Messages);
router.post("/GetMessages",sendMessages);


module.exports = router;
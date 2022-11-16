const express = require('express')

const router  = express.Router();

const {GetAllUsers} = require("../Controller/admin");

router.get("/getUser",GetAllUsers);

module.exports = router;
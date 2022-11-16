const express = require("express");

const router = express.Router();

const {CardPayment,CodPayment,getPayment} = require("../Controller/payment");

router.post("/CodPayment", CodPayment);
router.post("/CardPayment", CardPayment);
router.post("/GetPayment", getPayment);

module.exports = router;
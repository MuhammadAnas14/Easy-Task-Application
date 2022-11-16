const express = require("express");

const router = express.Router();

const {
    GiveFeedback,
    GetRating,
} = require("../Controller/feedback");

router.post("/GiveFeedback", GiveFeedback);
router.post("/GetRating", GetRating);

module.exports = router;
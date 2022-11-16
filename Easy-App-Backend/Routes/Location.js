const express = require('express')

const router  = express.Router();

const {LocationSaver, GetLocation,Arrived} = require('../Controller/LocationTracker')

router.post("/LiveLocation", LocationSaver);
router.post("/GetTracking",GetLocation);
router.post("/ArrivedTask",Arrived);

module.exports = router;
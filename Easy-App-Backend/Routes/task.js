const express = require("express");

const router = express.Router();

const {
  OnlineTask,
  ScheduledTask,
  LiveTask,
  MyTask,
  HomeTasks,
  Bids,
  DeleteBid,
  AcceptBid,
  CompleteTask,
} = require("../Controller/task");

router.post("/OnlineTask", OnlineTask);
router.post("/ScheduledTask", ScheduledTask);
router.post("/LiveTask", LiveTask);
router.get("/Collection", HomeTasks);
router.post("/MyTask", MyTask);
router.put("/Bids", Bids);
router.post("/DeleteBid", DeleteBid);
router.put("/AcceptBid", AcceptBid);
router.put("/CompleteTask", CompleteTask);

module.exports = router;

const express = require("express");
const router = express.Router();

const logQueue = require("../queue/logQueue");
const { searchLogs } = require("../controllers/logController");

router.post("/logs", async (req, res) => {
  await logQueue.add("log", req.body);
  res.json({ message: "Log queued successfully" });
});

router.get("/search", searchLogs);

module.exports = router;
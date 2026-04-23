const { Worker } = require("bullmq");
const mongoose = require("mongoose");
const Log = require("../models/Log");

mongoose.connect("mongodb://localhost:27017/logs");

new Worker(
  "logQueue",
  async (job) => {
    await Log.create(job.data);
  },
  { connection: { host: "127.0.0.1", port: 6379 } }
);
const { Queue } = require("bullmq");

const logQueue = new Queue("logQueue", {
  connection: { host: "127.0.0.1", port: 6379 },
});

module.exports = logQueue;
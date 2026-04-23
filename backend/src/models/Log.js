const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

logSchema.index({ level: 1 });
logSchema.index({ resourceId: 1 });
logSchema.index({ timestamp: 1 });
logSchema.index({ message: "text" });

module.exports = mongoose.model("Log", logSchema);
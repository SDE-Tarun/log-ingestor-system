const Log = require("../models/Log");

exports.searchLogs = async (req, res) => {
  try {
    const {
      level,
      message,
      resourceId,
      traceId,
      spanId,
      commit,
      parentResourceId,
      startTime,
      endTime,
    } = req.query;

    let query = {};

    if (level) query.level = level;
    if (resourceId) query.resourceId = resourceId;
    if (traceId) query.traceId = traceId;
    if (spanId) query.spanId = spanId;
    if (commit) query.commit = commit;
    if (parentResourceId)
      query["metadata.parentResourceId"] = parentResourceId;

    if (startTime && endTime) {
      query.timestamp = {
        $gte: new Date(startTime),
        $lte: new Date(endTime),
      };
    }

    if (message) {
      query.message = { $regex: message, $options: "i" };
    }

    const logs = await Log.find(query).limit(1000);

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
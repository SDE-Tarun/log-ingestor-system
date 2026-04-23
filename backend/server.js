const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const logRoutes = require("./src/routes/logRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/logs");

app.use("/api", logRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
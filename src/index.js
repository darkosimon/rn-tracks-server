require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
var cors = require("cors");

const mongoUri = "mongodb+srv://darkosimonovski:{PASSWORDHERE}@cluster0.r7a0aqc.mongodb.net/";

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB instance");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting mongo", err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email ${req.user.email}`);
});

app.listen(3101, () => {
  console.log("Listening on port 3101");
});

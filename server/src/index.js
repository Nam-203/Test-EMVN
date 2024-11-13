const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mongooseSanitize = require("express-mongo-sanitize");
const rateLitmit = require("express-rate-limit");
const path = require('path');
const fs = require('fs');
const routes = require("./Router");
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(mongooseSanitize());

const uploadsDir = path.join(__dirname, '../uploads/audio');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 3001;
const limiter = rateLitmit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "too many requests from IP , please try again in a hour",
});
app.use(limiter);
routes(app);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});

module.exports = app;

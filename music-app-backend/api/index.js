const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("../config/db");
const authRoutes = require("../routes/auth");
const songRoutes = require("../routes/Songs");

dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server error!"
  });
});

module.exports = app;
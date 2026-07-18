const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("../config/db");
const authRoutes = require("../routes/auth");
const songRoutes = require("../routes/Songs");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);

let isConnected = false;

app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("MongoDB Connected!");
    }
    next();
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    res.status(500).json({
      message: error.message
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server error!"
  });
});

module.exports = app;
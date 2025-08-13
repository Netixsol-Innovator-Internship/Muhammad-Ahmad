const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { dbName: "task_app_dev" });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

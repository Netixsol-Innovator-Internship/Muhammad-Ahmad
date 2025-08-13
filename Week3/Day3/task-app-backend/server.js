const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

dotenv.config();

const app = express();

// core middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// health check
app.get("/", (req, res) => res.json({ status: "ok" }));

// routes
app.use("/api/users", require("./src/routes/authRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"));

// error handler
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

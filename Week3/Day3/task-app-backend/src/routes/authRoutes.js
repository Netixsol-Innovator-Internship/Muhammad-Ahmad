const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { add: addToBlacklist } = require("../utils/tokenBlacklist");

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });

    // optional: auto-login after register
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
});

// POST /api/users/logout (requires auth) – invalidates current token
router.post("/logout", auth, async (req, res, next) => {
  try {
    // token exp in seconds since epoch is in req.tokenPayload.exp
    addToBlacklist(req.token, req.tokenPayload.exp);
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

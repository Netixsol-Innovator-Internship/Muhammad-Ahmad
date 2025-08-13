const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../utils/tokenBlacklist");

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({ message: "Token invalidated. Please log in again." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId };
    req.tokenPayload = payload; // useful for logout (exp)
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

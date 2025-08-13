// Simple in-memory blacklist: [{ token, expMs }]
// NOTE: resets on server restart
let blacklist = [];

function prune() {
  const now = Date.now();
  blacklist = blacklist.filter(entry => entry.expMs > now);
}

function add(token, expSeconds) {
  const expMs = expSeconds * 1000;
  blacklist.push({ token, expMs });
  prune();
}

function isBlacklisted(token) {
  prune();
  return blacklist.some(entry => entry.token === token);
}

module.exports = { add, isBlacklisted };

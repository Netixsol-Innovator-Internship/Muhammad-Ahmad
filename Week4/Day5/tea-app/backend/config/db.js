const mongoose = require('mongoose');

const connectDB = async (retries = 3, delayMs = 3000) => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set in environment');
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
      });
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error(`MongoDB connection error (attempt ${attempt}/${retries}):`, err.message);
      if (attempt < retries) {
        console.log(`Retrying in ${delayMs}ms...`);
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        console.error('All connection attempts failed. The server will continue to run but DB functionality will be unavailable.');
        console.error('Common causes: DNS/SRV lookup blocked (querySrv EREFUSED), firewall blocking outgoing DNS/SRV or MongoDB ports, or incorrect MONGO_URI.');
        console.error('To debug: run in cmd: nslookup -type=SRV _mongodb._tcp.' + (process.env.MONGO_HOST || 'cluster0.c2k6hmp.mongodb.net'));
        // do not exit; leave it to the app to operate in degraded mode
      }
    }
  }
};

module.exports = connectDB;

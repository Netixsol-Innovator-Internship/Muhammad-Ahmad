const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

// Environment validation for production
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    // Don't exit in serverless environment, just log the error
  }
}

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://ahmad-week4-day5-tea-frontend.vercel.app" // your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve product and collection images from backend first (place files in backend/public/images)
// This allows the backend to be the canonical host for media. Keep a fallback to the
// frontend public folder to preserve compatibility while migrating assets.
app.use(
  '/images',
  express.static(path.join(__dirname, 'public', 'images'), { maxAge: '30d' })
);

// Note: Fallback to frontend images removed for Vercel deployment compatibility
// app.use('/images', express.static(path.join(__dirname, '..', 'frontend', 'public', 'images')));

// Connect to MongoDB - handle errors gracefully in serverless environment
connectDB().catch(err => {
  console.error('Database connection failed:', err.message);
  // Continue without database in serverless environment
});

// Initialize Cloudinary connection
const { testConnection } = require('./config/cloudinary');
testConnection();

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mountDocs = require('./docs/swagger');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

// Swagger docs
mountDocs(app);

// Simple test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Tea Backend API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

// For local development only
// if (process.env.NODE_ENV !== 'production') {
//   const server = app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`API Documentation: http://localhost:${PORT}/docs`);
//     console.log(`Health Check: http://localhost:${PORT}/health`);
//   });

//   // Graceful shutdown
//   process.on('SIGTERM', () => {
//     console.log('SIGTERM received. Shutting down gracefully...');
//     server.close(() => {
//       console.log('Process terminated');
//     });
//   });
// }

module.exports = app;

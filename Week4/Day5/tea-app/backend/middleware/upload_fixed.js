const multer = require('multer');
const path = require('path');
const fs = require('fs');

// For Vercel serverless environment - disable local file uploads
// In production, use cloud storage like AWS S3, Cloudinary, etc.

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // In production/serverless, disable file uploads temporarily
  console.log('File uploads disabled in serverless environment');
  
  // Create dummy middleware that just passes through
  const uploadSingle = (req, res, next) => {
    // In production, you would handle file uploads differently
    // For now, just continue without file processing
    next();
  };
  
  const uploadMultiple = (req, res, next) => {
    next();
  };
  
  const handleUploadError = (err, req, res, next) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File upload not available in production environment'
      });
    }
    next();
  };
  
  module.exports = {
    uploadSingle,
    uploadMultiple,
    handleUploadError
  };
  
} else {
  // Local development - full file upload functionality
  const uploadDir = path.join(__dirname, '..', 'public', 'images', 'products');
  const uploadsDir = path.join(__dirname, '..', 'uploads');

  // Create directories if they don't exist (local development only)
  [uploadDir, uploadsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // Generate unique filename: timestamp + random number + original extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, 'product-' + uniqueSuffix + extension);
    }
  });

  // File filter to only allow images
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, webp) are allowed!'));
    }
  };

  // Configure multer
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
  });

  // Middleware for single file upload
  const uploadSingle = upload.single('image');

  // Middleware for multiple file upload (up to 5 images)
  const uploadMultiple = upload.array('images', 5);

  // Error handling middleware
  const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 5MB.'
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum is 5 images.'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error: ' + err.message
      });
    }
    
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    next();
  };

  module.exports = {
    uploadSingle,
    uploadMultiple,
    handleUploadError
  };
}

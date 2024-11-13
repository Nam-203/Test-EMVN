const multer = require('multer');
const path = require('path');

// Configure multer to store uploaded files on the disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/audio');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Define a file filter to ensure only MP3 files are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only MP3 files are allowed!'), false);
  }
};

// Create a multer instance with the specified configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024  
  }
});

// Export the multer instance for use in other modules
module.exports = upload; 
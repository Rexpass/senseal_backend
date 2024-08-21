const multer = require('multer');
const path = require('path');

app.use('/uploads', express.static('uploads'));

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads',  // Directory to store uploaded files
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  // Rename the file
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;  // Allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },  // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('coverImage');  // Accept a single file named 'coverImage'

module.exports = upload;

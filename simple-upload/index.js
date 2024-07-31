const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    // Generate a random string
    const randomString = crypto.randomBytes(8).toString('hex');
    // Get the file extension
    const ext = path.extname(file.originalname);
    // Create the new filename
    const filename = `${Date.now()}-${randomString}${ext}`;
    cb(null, filename);
  }
});

// Init upload
const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Extract the host and protocol from the request headers
  const host = req.get('host');
  const protocol = req.get('X-Forwarded-Proto') || req.protocol;
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  res.status(200).json({ fileUrl });
});

// Serve static files in uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

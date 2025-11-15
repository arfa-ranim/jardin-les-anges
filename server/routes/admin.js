const express = require('express');
const multer = require('multer');
const GalleryItem = require('../models/GalleryItem');
const router = express.Router();

// Upload to public/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../client/public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/admin/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  const { category, caption } = req.body;
  const url = `/uploads/${req.file.filename}`;

  const item = new GalleryItem({ category, url, caption, alt: caption });
  await item.save();
  res.json(item);
});

module.exports = router;
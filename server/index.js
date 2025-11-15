const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Create uploads folder
const uploadDir = path.join(__dirname, '../client/public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Serve uploads
app.use('/uploads', express.static(uploadDir));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Models
const gallerySchema = new mongoose.Schema({
  category: String,
  url: String,
  alt: String,
  caption: String
});
const GalleryItem = mongoose.model('GalleryItem', gallerySchema);

// Routes
app.get('/api/gallery', async (req, res) => {
  try {
    const items = await GalleryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Erreur' });
  }
});

// Admin Routes (in separate file later)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const authAdmin = (req, res, next) => {
  const pass = req.headers['x-admin-pass'];
  if (pass !== process.env.ADMIN_PASS) {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  next();
};

app.post('/api/admin/upload', authAdmin, upload.single('image'), async (req, res) => {
  const { category, caption } = req.body;
  const url = `/uploads/${req.file.filename}`;
  const item = new GalleryItem({ category, url, caption, alt: caption });
  await item.save();
  res.json(item);
});

// DELETE: Remove image from DB + file system
app.delete('/api/admin/delete/:id', authAdmin, async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Image non trouvée' });

    // Delete file from uploads/
    const filePath = path.join(__dirname, '../client/public', item.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
});
// DELETE: Remove entire category + all files
app.delete('/api/admin/category/:name', authAdmin, async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.name);
    const items = await GalleryItem.find({ category: categoryName });

    // Delete files
    for (const item of items) {
      const filePath = path.join(__dirname, '../client/public', item.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from DB
    await GalleryItem.deleteMany({ category: categoryName });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression catégorie' });
  }
});
// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur serveur' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
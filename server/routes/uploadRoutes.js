const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = 'avatar-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6) + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// 上传头像
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    const avatarPath = '/uploads/' + req.file.filename;
    await pool.query('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, req.user.id]);
    res.json({ code: 200, avatar: avatarPath });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '上传失败' });
  }
});

module.exports = router;
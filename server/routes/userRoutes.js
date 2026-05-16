const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// 获取当前登录用户的信息
router.get('/me', auth, async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT id, username, nickname, email, phone, gender, bio, avatar, role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (user.length === 0) {
      return res.json({ code: 401, msg: '用户不存在' });
    }

    res.json({
      code: 200,
      user: user[0]
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '服务器错误' });
  }
});

// 修改个人资料（昵称、简介、性别、电话、邮箱）
router.post('/profile', auth, async (req, res) => {
  try {
    const { nickname, bio, gender, phone, email } = req.body;

    await pool.query(
      'UPDATE users SET nickname = ?, bio = ?, gender = ?, phone = ?, email = ? WHERE id = ?',
      [nickname, bio, gender, phone, email, req.user.id]
    );

    res.json({ code: 200, msg: '资料保存成功' });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '保存失败' });
  }
});

module.exports = router;
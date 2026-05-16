const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const config = require('../config/config');

// 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [users] = await pool.query(
      'SELECT id, username, nickname, password, role, avatar FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.json({ code: 401, msg: '用户名或密码错误' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ code: 401, msg: '用户名或密码错误' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      code: 200,
      token,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        role: user.role,
        avatar: user.avatar || ''
      }
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '服务器错误' });
  }
});

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, password, nickname } = req.body;

    const [exist] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (exist.length > 0) {
      return res.json({ code: 400, msg: '用户名已存在' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO users (username, password, nickname, role) VALUES (?, ?, ?, ?)',
      [username, hashedPwd, nickname || username, 'user']
    );

    res.json({ code: 200, msg: '注册成功' });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '服务器错误' });
  }
});

module.exports = router;
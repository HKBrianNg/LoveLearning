const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 注册
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [exist] = await pool.query('SELECT * FROM users WHERE username=?',[username]);
    if(exist.length) return res.json({ code:400, msg:'账号已存在' });

    const pwd = await bcrypt.hash(password,10);
    await pool.query('INSERT INTO users(username,password) VALUES(?,?)',[username,pwd]);
    res.json({ code:200, msg:'注册成功' });
  } catch (err) {
    res.json({ code:500, msg:'服务器错误' });
  }
};

// 登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE username=?',[username]);
    if(!rows.length) return res.json({ code:400, msg:'账号不存在' });

    const ok = await bcrypt.compare(password, rows[0].password);
    if(!ok) return res.json({ code:400, msg:'密码错误' });

    const token = jwt.sign({ id:rows[0].id, username:rows[0].username },
      process.env.JWT_SECRET, { expiresIn:'7d' });

    res.json({
      code:200,
      token,
      user:{
        id:rows[0].id,
        username:rows[0].username,
        nickname:rows[0].nickname || rows[0].username,
        bio:rows[0].bio,
        gender:rows[0].gender,
        phone:rows[0].phone,
        email:rows[0].email
      }
    });
  } catch (err) {
    res.json({ code:500, msg:'服务器错误' });
  }
};

// 获取用户信息
exports.getUserInfo = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id=?',[req.user.id]);
    if(!rows.length) return res.json({ code:400, msg:'用户不存在' });
    const u = rows[0];
    res.json({
      code:200,
      user:{
        username:u.username,
        nickname:u.nickname||u.username,
        bio:u.bio,
        gender:u.gender,
        phone:u.phone,
        email:u.email
      }
    });
  } catch {
    res.json({ code:500, msg:'服务器错误' });
  }
};

// 更新资料
exports.updateProfile = async (req, res) => {
  try {
    const { nickname, bio, gender, phone, email } = req.body;
    await pool.query(
      'UPDATE users SET nickname=?,bio=?,gender=?,phone=?,email=? WHERE id=?',
      [nickname,bio,gender,phone,email,req.user.id]
    );
    res.json({ code:200, msg:'保存成功' });
  } catch {
    res.json({ code:500, msg:'服务器错误' });
  }
};

// 修改密码
exports.changePwd = async (req, res) => {
  try {
    const { oldPwd, newPwd } = req.body;
    const [rows] = await pool.query('SELECT password FROM users WHERE id=?',[req.user.id]);
    if(!rows.length) return res.json({ code:400, msg:'用户不存在' });

    const ok = await bcrypt.compare(oldPwd, rows[0].password);
    if(!ok) return res.json({ code:400, msg:'旧密码错误' });

    const pwd = await bcrypt.hash(newPwd,10);
    await pool.query('UPDATE users SET password=? WHERE id=?',[pwd,req.user.id]);
    res.json({ code:200, msg:'密码修改成功' });
  } catch {
    res.json({ code:500, msg:'服务器错误' });
  }
};
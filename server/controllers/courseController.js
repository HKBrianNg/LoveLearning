const pool = require('../config/db');

exports.getCourses = async (req, res) => {
  try {
    const [list] = await pool.query('SELECT * FROM courses');
    res.json({ code:200, list });
  } catch {
    res.json({ code:500, msg:'获取课程失败' });
  }
};
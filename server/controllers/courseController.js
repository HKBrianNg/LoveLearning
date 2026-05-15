const pool = require('../config/db');

// 获取所有课程
exports.getCourses = async (req, res) => {
  try {
    const [list] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
    res.json({ code:200, list });
  } catch {
    res.json({ code:500, msg:'获取课程失败' });
  }
};

// 新增课程
exports.addCourse = async (req, res) => {
  try {
    const { title, descr } = req.body;
    await pool.query('INSERT INTO courses(title,descr) VALUES(?,?)',[title,descr]);
    res.json({ code:200, msg:'新增成功' });
  } catch {
    res.json({ code:500, msg:'新增失败' });
  }
};

// 编辑课程
exports.editCourse = async (req, res) => {
  try {
    const { id, title, descr } = req.body;
    await pool.query('UPDATE courses SET title=?,descr=? WHERE id=?',[title,descr,id]);
    res.json({ code:200, msg:'修改成功' });
  } catch {
    res.json({ code:500, msg:'修改失败' });
  }
};

// 删除课程
exports.delCourse = async (req, res) => {
  try {
    const { id } = req.body;
    await pool.query('DELETE FROM courses WHERE id=?',[id]);
    res.json({ code:200, msg:'删除成功' });
  } catch {
    res.json({ code:500, msg:'删除失败' });
  }
};
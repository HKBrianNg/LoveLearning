const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/courseController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// 所有人可看
router.get('/list', courseCtrl.getCourses);

// 仅管理员可增删改
router.post('/add', adminAuth, courseCtrl.addCourse);
router.post('/edit', adminAuth, courseCtrl.editCourse);
router.post('/del', adminAuth, courseCtrl.delCourse);

module.exports = router;
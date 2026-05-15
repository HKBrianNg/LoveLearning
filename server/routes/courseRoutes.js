const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/courseController');

router.get('/list', courseCtrl.getCourses);

module.exports = router;
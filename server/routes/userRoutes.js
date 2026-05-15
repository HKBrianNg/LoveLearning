const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/info', auth, userCtrl.getUserInfo);
router.post('/profile', auth, userCtrl.updateProfile);
router.post('/changepwd', auth, userCtrl.changePwd);

module.exports = router;
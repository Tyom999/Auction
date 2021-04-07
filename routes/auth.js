const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

router.post('/signIn', authController.signIn);
router.post('/signUp', authController.signUp);
router.post('/logout', authController.logout);

module.exports = router;

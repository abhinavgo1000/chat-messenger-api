const express = require('express');
const router = express.Router();

const authController = require('../controllers/authcontroller');

router.get('', authController.getLogin);

router.post('', authController.postLogin);

router.post('', authController.postLogout);

module.exports = router;

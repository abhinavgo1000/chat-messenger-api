const express = require('express');
const router = express.Router();

const userController = require('../controllers/usercontroller');

router.get('', userController.fetchUser);

router.post('', userController.createUser);

router.patch('', userController.updateUser);

router.delete('', userController.deleteUser);

module.exports = router;
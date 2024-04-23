const express = require('express');
const router = express.Router();

const userController = require('../controllers/usercontroller');

router.get('/:userId', userController.fetchUser);

router.get('', userController.fetchAllUsers);

router.post('', userController.createUser);

router.get('/:userId', userController.getUpdateUser);

router.patch('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
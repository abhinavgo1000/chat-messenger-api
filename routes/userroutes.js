const express = require('express');
const router = express.Router();

const userController = require('../controllers/usercontroller');

router.get('', userController.fetchUser);

router.post('', userController.createUser);

router.put('', userController.updateUser);

router.patch('', userController.patchUser);

router.delete('', userController.deleteUser);

module.exports = router;
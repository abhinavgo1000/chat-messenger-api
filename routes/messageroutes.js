const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messagecontroller');
const isAuth = require('../middleware/is-auth');

router.get('', messageController.receiveMessages);

router.post('', isAuth, messageController.sendMessages);

module.exports = router;

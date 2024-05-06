const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messagecontroller');
const isAuth = require('../middleware/is-auth');

router.get('/receive', messageController.receiveMessages);

router.post('/send', messageController.sendMessages);

module.exports = router;

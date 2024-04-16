const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messagecontroller');

router.get('', messageController.receiveMessages);

router.post('', messageController.sendMessages);

module.exports = router;

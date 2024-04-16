const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messagecontroller');

router.get('', messageController.getMessages);

router.post('', messageController.postMessages);

module.exports = router;

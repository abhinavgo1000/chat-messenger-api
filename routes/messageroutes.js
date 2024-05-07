const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const messageController = require('../controllers/messagecontroller');
const isAuth = require('../middleware/is-auth');

router.get('/receive', messageController.receiveMessages);

router.get('/receive/:messageId', messageController.showMessage);

router.post('/send', [
    body('message').trim().isLength({min: 5})
], messageController.sendMessages);

module.exports = router;

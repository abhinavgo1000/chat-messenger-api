const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profilecontroller');

router.get('/:profileId', profileController.fetchProfile);

router.get('', profileController.fetchAllProfiles);

router.post('', profileController.createProfile);

router.patch('/:profileId', profileController.updateProfile);

router.delete('/:profileId', profileController.deleteProfile);

module.exports = router;

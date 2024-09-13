const express = require('express');
const router = new express.Router();

const useractions = require('../../controller/user/userController');

router.post('/user', useractions.create_a_user);
router.post('/user/login', useractions.read_a_user);

module.exports = router;
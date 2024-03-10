const express = require('express');
const router = express.Router();

const userDetails = require('../controllers/usercontroller');

router.post('/registration',userDetails.registerUser)
router.post('/login',userDetails.loginUser)


module.exports = router;
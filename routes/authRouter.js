var express = require('express');
var router = express.Router();
const {doSignUp, doLogin, register} = require('../Controllers/authController')


router.post('/signup', doSignUp)
router.post('/login', doLogin)
router.post('/register', register)

module.exports = router;
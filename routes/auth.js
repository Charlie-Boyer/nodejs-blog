const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local'), authController.postLogin);

module.exports = router;
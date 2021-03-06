const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');



router.get('/login', ( req, res ) => {
  console.log(req.session)
  res.render('auth/login')
});



router.post('/login', passport.authenticate('local'), ( req, res ) => {
  res.send('login ok')
});


module.exports = router;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username)
    User.findOne({ username: username }, function (err, user) {
      console.log(user)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password !== password) { return done(null, false); }
      return done(null, user);
    });
  }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  else {
    return res.sendStatus(403) 
  }
}
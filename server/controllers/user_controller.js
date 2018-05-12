const { mongoose } = require('../db/db');
const passport = require('passport');

module.exports = {

  loginGoogle(req, res, next) {
    console.log('logging in with google');
    return passport.authenticate('google', {
      // add email to array to get email too
      scope: ['profile']
    });
  },
  
  googleRedirect(req, res, next) {
    console.log('User:', req.user);
    // res.send('you reached the callback URI')
    //var token = req.user.tokens[req.user.tokens.length - 1].token
    //res.redirect(process.env.GOOGLE_REDIRECT_URL + token)
    res.redirect(process.env.GOOGLE_REDIRECT_URL)
  },
  
  logout(req, res, next) {
    res.send('logging out')
  }
  
}
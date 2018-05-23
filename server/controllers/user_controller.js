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
    console.log (req.user)
    // var token = req.user.tokens[req.user.tokens.length - 1].token
    // res.redirect(`${process.env.GOOGLE_REDIRECT_URL}/$${token}`);
    res.redirect(process.env.GOOGLE_REDIRECT_URL);
  },

  // getUser(req, res) {
	// 	res.send(req.user);
	// },
  
  logout(req, res, next) {
    // res.send('logging out')
    console.log('Logging Out')
    req.logout();
    // req.user.removeToken(req.token)
    // .then(() => {
       res.status(204).send();
    // }).catch(next);
  }
  
}

const router = require('express').Router()
const UserController = require('../controllers/user_controller');

const passport = require ('passport');

// Middleware to check if user is logged in before routing.
// Usage - router.get('/profile', authCHeck, (req, res)={ ... })
const authCheck = (req, res, next) =>{
  if (!req.user) {
    // redirect to client side login page (below is server side)
    res.redirect('/auth/login')
  }else {
    next()
  }
}


// router.get('/google', UserController.loginGoogle);

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', passport.authenticate('google'), UserController.googleRedirect);

router.get('/logout', UserController.logout);

module.exports = router;


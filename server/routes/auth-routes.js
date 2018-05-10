
const router = require('express').Router()
const UserController = require('../controllers/user_controller');

const passport = require ('passport');

// router.get('/google', UserController.loginGoogle);

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/logout', UserController.logout);

router.get('/google/callback', passport.authenticate('google'), UserController.googleRedirect);

module.exports = router;


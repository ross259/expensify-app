
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    callbackURL: process.env.GOOGLE_CALLBACK_URL,

    // profileFields: ['id', 'displayName', 'photos', 'email'],
    // passReqToCallback: true
  }, (accessToken, refreshToken, profile, done) =>{
    console.log(profile);
  })
);
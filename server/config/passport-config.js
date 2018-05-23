
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

passport.serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(err,user)
  })
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    // profileFields: ['id', 'displayName', 'photos', 'email'],
    // passReqToCallback: true
  }, (accessToken, refreshToken, profile, done) => {

    console.log('ACCESS TOKEN:', accessToken);

    User.findOne({ 'googleId': profile.id })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          googleToken: accessToken
        }).save()
          .then((newUser) => {
            // newUser.tokens.push({ access:'auth', token:accessToken });
            console.log('User Created:', newUser);
            return done(null, newUser);
          });
      }
    }).catch((e)=>{
      console.log('Error finding profile:', e);
    })

  })
);
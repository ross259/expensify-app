
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(err, user)
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
    // USE JWT TOKEN INSTEAD. YOU DONT NEED THE ACCEESSTOKEN. THAT IS FOR CONNECTING TO GOOGLE. CREATE YOUR OWN TOKEN FOR YOUR USER.

    // Find by google.id AND token?
    User.findOne({ 'google.id': profile.id })
      .then((user) => {
        if (user) {
          // user.generateAuthToken();
          user.tokens.push ({access:'auth', token:accessToken})
          return done(null, user);
        } else {
          // google.tokens: ...google.tokens, accessToken
          new User({
            username: profile.displayName,
            google: {
              id: profile.id,
              token: accessToken
            },
            tokens:[{access:'auth', token:accessToken}]
          }).save()
            .then((newUser) => {
              // newUser.generateAuthToken();
              // newUser.tokens.push ({access:'auth', token:accessToken})
              console.log('User Created:', newUser);
              return done(null, newUser);
            });
        }
      }).catch((e) => {
        console.log('Error finding profile:', e);
      })

  })
);
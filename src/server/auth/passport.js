import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import createDebug from 'debug';

import User from '../api/resources/user/user.model';
import config from '../config';

const debug = createDebug('passport');

export default (passport) => {
  debug('Setup...');

  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: config.auth.facebook.clientId,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: config.auth.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'emails'],
      },
      function(accessToken, refreshToken, profile, done) {
        debug('Facebook Strategy...');

        User.findOne({ email: profile.emails[0].value }, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);
          }

          const newUser = new User();
          newUser.provider = 'facebook';
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.isVerified = true;
          newUser.facebook.facebookId = profile.id;
          newUser.facebook.facebookToken = {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };

          newUser.save(function(err) {
            if (err) done(err);
            return done(null, newUser);
          });
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: config.auth.google.clientId,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbackURL,
      },
      function(accessToken, refreshToken, profile, done) {
        debug('Google Strategy...');

        User.findOne({ email: profile.emails[0].value }, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);
          }

          const newUser = new User();
          newUser.provider = 'google';
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.isVerified = true;
          newUser.google.googleId = profile.id;
          newUser.google.googleToken = {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          newUser.save(function(err) {
            if (err) done(err);
            return done(null, newUser);
          });
        });
      }
    )
  );
};

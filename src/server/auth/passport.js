import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import createDebug from 'debug';

import User from '../api/resources/user/user.model';
import config from '../config';

const debug = createDebug('passport');

export default (passport) => {
  debug('Setup...');

  passport.serializeUser(function(user, done) {
    debug('Serialize User...');
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    debug('Deserialize User...');
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });

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

          if (!user) {
            user = new User();
          }

          user.provider = 'facebook';
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          user.isVerified = true;
          user.facebook.facebookId = profile.id;
          user.facebook.facebookToken = {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };

          user.save(function(err) {
            if (err) done(err);
            return done(null, user);
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

          if (!user) {
            user = new User();
          }

          user.provider = 'google';
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          user.isVerified = true;
          user.google.googleId = profile.id;
          user.google.googleToken = {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          user.save(function(err) {
            if (err) done(err);
            return done(null, user);
          });
        });
      }
    )
  );
};

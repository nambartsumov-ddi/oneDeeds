import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import createDebug from 'debug';

import User from '../api/resources/user/user.model';
import config from '../config';

const debug = createDebug('passport');

export const setup = (passport) => {
  debug('setup started...');

  passport.serializeUser(function(user, done) {
    debug(user);
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(
    new LocalStrategy.Strategy({ usernameField: 'email' }, function(req, email, done) {
      const newUser = new User({
        email: email,
        varified: false,
      });

      User.findOne({ email }, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    })
  );

  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: config.auth.facebook.clientId,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: config.auth.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'emails'],
      },
      function(accessToken, refreshToken, profile, done) {
        const newUser = new User();
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.facebookId = profile.id;
        newUser.facebookToken = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        newUser.varified = true;

        User.findOne({ email: profile.emails[0].value }, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);
          } else {
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
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
        const newUser = new User();
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.googleId = profile.id;
        newUser.googleToken = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        newUser.varified = true;

        User.findOne({ email: profile.emails[0].value }, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);
          } else {
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      }
    )
  );
};

import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import createDebug from 'debug';
import randomstring from 'randomstring';
import sendTokenEmail from '../sendgrid';

import User from '../api/resources/user/user.model';
import Token from '../api/resources/token/token.model';
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
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
        passwordField: 'email',
        passReqToCallback: true,
      },
      function(req, email, password, done) {
        debug('Local Strategy...');

        User.findOne({ email: email }, (err, user) => {
          if (err) return done(err);

          // Login user from session
          if (req.user) {
            done(null, req.user);
          } else {
            if (user) {
              // Create a access token for existing user
              const newToken = new Token({
                _userId: user.id,
                accessToken: randomstring.generate({
                  length: 64,
                }),
              });

              newToken.save((err) => {
                if (err) return done(err);
                sendTokenEmail(req.headers.origin, newToken.accessToken, email)
                  .then(() => {
                    debug(`Email sent to ${email}! Token: ${newToken.accessToken}`);
                    return done(null, false);
                  })
                  .catch((err) => done(err));
              });
            } else {
              // Create user and send access token
              const newUser = new User({
                provider: 'local',
                email: email,
                isVerified: false,
              });

              newUser.save((err) => {
                if (err) return done(err);

                // Create a access token for this user
                const newToken = new Token({
                  _userId: newUser.id,
                  accessToken: randomstring.generate({
                    length: 64,
                  }),
                });

                newToken.save((err) => {
                  if (err) return done(err);
                  sendTokenEmail(req.headers.origin, newToken.accessToken, email)
                    .then(() => {
                      debug(`Email sent to ${email}! Token: ${newToken.accessToken}`);
                      return done(null, false);
                    })
                    .catch((err) => done(err));
                });
              });
            }
          }
        });
      }
    )
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

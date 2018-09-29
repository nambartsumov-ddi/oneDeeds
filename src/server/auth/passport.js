import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import createDebug from 'debug';
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';

import User from '../api/resources/user/user.model';
import Token from '../api/resources/token/token.model';
import config from '../config';

const debug = createDebug('passport');

export const setup = (passport) => {
  debug('setup started...');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
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
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) return done(err);

          if (user) {
            // TODO: // Existing user. Send access token.
            return done(null, false, { message: 'Existing user. Please check your email and click the access link.' });
          }

          const newUser = new User({
            local: {
              email: email,
            },
          });

          newUser.save((err) => {
            if (err) return done(err);

            // Create a verification token for this user
            const newToken = new Token({
              _userId: newUser.id,
              accessToken: randomstring.generate({
                length: 64,
              }),
            });

            newToken.save((err) => {
              if (err) return done(err);

              // Send the email
              const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'yotamelkaslasy@gmail.com',
                  pass: 'nqrwnpyqiustpzct',
                },
              });

              const mailOptions = {
                from: 'yotamelkaslasy@gmail.com',
                to: newUser.local.email,
                subject: 'oneDeeds Access Link',
                text: `
Hello,

Access your account by clicking the following link:
http://${req.headers.host}/login/${newToken.accessToken}.

Enjoy the ride.
`,
              };

              transporter.sendMail(mailOptions, function(err, info) {
                if (err) return done(err);
                debug(`Message ${info.messageId} sent: ${info.response}`);
              });

              return done(null, newUser, { message: `An access email link was sent to: ${newUser.local.email}.` });
            });
          });
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
        const newUser = new User();
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.facebookId = profile.id;
        newUser.facebookToken = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        newUser.verified = true;

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
        newUser.verified = true;

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

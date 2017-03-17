'use strict';

const User = require('./../models/UserModel');
const mongoose = require('mongoose')
const FacebookStrategy = require('passport-facebook').Strategy;
const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET,
  ROOT_PATH
} = require('config/env');

module.exports = new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: ROOT_PATH + '/auth/facebook/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    const options = {
      criteria: { 'facebook.id': profile.id }
    };
    User.load(options, function (err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          username: profile.username,
          provider: 'facebook',
          facebook: profile._json
        });
        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
);

'use strict';

const mongoose = require('mongoose')
const User = require('./../models/UserModel')

const facebook = require('./facebook');

module.exports =  function(passport) {
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.load({ criteria: { _id: id } }, cb));
  passport.use(facebook);
};

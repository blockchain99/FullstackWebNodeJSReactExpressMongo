const express = require('express'); //common js module for server side
//but for react es6, import express from 'express';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();
//clientID:
//clientSecret:
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  accessToken => {
    console.log(accessToken);
  }
 )
);


const PORT = process.env.PORT || 5000;
app.listen(PORT);

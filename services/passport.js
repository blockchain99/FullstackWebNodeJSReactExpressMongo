//copied from server.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');//upto the dir, so ..

const User = mongoose.model('users');

//Turn user model instance, mongoose model(user) into the id
//1st arg user model, 2nd done function
passport.serializeUser((user, done) => { //done is callback
//error,identifying piece of information to identify user and follow up request.
//user.id is not profile.id
  done(null, user.id);
});

//Turn id into mongoose model instance(search whole collection of users
//by id, )
//1st arg(user.id): token which previoiusly stuffed into the cookie,
//2nd () : callback func, call after successfully turn id back into user
passport.deserializeUser((id, done) => {
  User.findById(id) //always asynchronous
  .then(user => {
    done(null, user)
  });
});
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    // callbackURL: 'https://arcane-eyrie-64377.herokuapp.com/auth/google/callback',
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  // refactor with async/await version
  async (accessToken, refreshToken, profile, done) => {
    // const existingUser = await findOne({ googleId: profile.id });  //it caused error!
    const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
  }
 )
);

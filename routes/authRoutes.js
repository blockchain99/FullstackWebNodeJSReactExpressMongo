const passport = require('passport');//original npm passport module(not passport.js)
//copied from server.js
// module.exports = (app) => {
//call the func with app obj
module.exports = app => {//add app arg to the func.
  app.get(
    '/auth/google',
    passport.authenticate('google', {
    scope: ['profile', 'email']
  })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
//take cookie containg user id, kill the id in cookie.you're not the user anymore.
    req.logout();
//send back acknoowlodment, prove there is no longer signed in.
     res.send(req.user);    
  });
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);//req : incoming, res: outgoing
  });
};

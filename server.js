const express = require('express'); //common js module for server side
//but for front-side react es6, import express from 'express';
// const passportConfig = require('./services/passport');//this not return anything.
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');//access cookie
const passport = require('passport');//tell passport to use cookie
const bodyParser = require('body-parser');//exprss middleware
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey')
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');
// require('./routes/authRoutes'); //1

// mongoose.connnect('mongodb://<dbuser>:<dbpassword>@ds161183.mlab.com:61183/emailydev');
mongoose.Promise = global.Promise; //I just added on Dec 18 2018
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30* 24* 60* 60 *1000,//how long cookie exists in browser(30 days in miliSec)
    keys: [keys.cookieKey]//key encrypted
  })
);
app.use(passport.initialize());
app.use(passport.session());

// authRoutes(app);  //1 --> below line
//return authRoutes function with app object.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


//production
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

//Express will serve up the index.html file
//if it doesn't recognize the router - change2
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);

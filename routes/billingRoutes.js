const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
//take credit card token & charge using it.
//Not every routes need to go through m/w(app.use()..in server.js),
// but only /api/stripe route need m/w(user to be authenticated)
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

//parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
    // console.log(req.body);//check in command line
    const charge = await stripe.charges.create({ //actually build credit Card
//passing configuration object(specifically instruct stripe what to do)
      amount: 500,
      currency: 'usd',
      description: '$10 for 10 credits',
      source: req.body.id //'tok_1DdLN9IdHGHddysAcbou1ZeU',
    });
    // console.log(charge);
    req.user.credits += 10;
    const user = await req.user.save();

    res.send(user);//send back user model to the client

  });
};

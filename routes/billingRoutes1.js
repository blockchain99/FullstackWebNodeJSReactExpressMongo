const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
//take credit card token & charge using it.
module.exports = app => {
  app.post('/api/stripe', (req, res) => {
//parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
    // console.log(req.body);//check in command line
    stripe.charges.create({ //actually build credit Card
//passing configuration object(specifically instruct stripe what to do)
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id //'tok_1DdLN9IdHGHddysAcbou1ZeU',
    })
  });
};

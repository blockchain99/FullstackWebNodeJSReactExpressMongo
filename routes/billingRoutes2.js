const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
//take credit card token & charge using it.
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' })
    }
//parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
    // console.log(req.body);//check in command line
    const charge = await stripe.charges.create({ //actually build credit Card
//passing configuration object(specifically instruct stripe what to do)
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id //'tok_1DdLN9IdHGHddysAcbou1ZeU',
    });
    // console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);//send back user model to the client

  });
};

//await mail.send(), async(req, res)
const _ = require('lodash');
// const Path = require('path-parser');
const { Path } = require('path-parser');
const { URL } = require('url');  //default nodejs,no install
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); //acess mongoose model class created

module.exports = app => {
//We don't want big list of recipients for every individual survey
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }) //Survey.js _user
        .select({ recipients: false });//not give us the list of recipient who is false
    res.send(surveys);
  });
  // app.get('/api/surveys/thanks', (req, res) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          // return match;
          return { email, surveyId: match.surveyId, choice: match.choice }
          }
        })
       .compact() //remove undefined in array
      //in compactEvents array, any duplicated elements in email, surveyId prop.
       .uniqBy('email', 'surveyId')
       .each(({ surveyId, email, choice }) => {
         Survey.updateOne(
          {
             _id: surveyId,
             recipients: {
             $elemMatch: { email: email }
             // $elemMatch: { email }
             // $elemMatch: { email: email, responded: false }
             }
          },
         {
             $inc: { [choice]: 1 },
             $set: { 'recipients.$.responded': true },
             lastResponded: new Date()
         }
       ).exec();
     })
      .value();
    res.send({});
  });

  //check 1) user login , 2)have enough credit on hand to survey in /middleware
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
//to use model class, need to create instance of Survey
    const survey = new Survey({
      title,
      subject,
      body,
      // recipients: recipients.split(',').map(email => { return { email: email }})
      // recipients: recipients.split(',').map(email => { return { email }})
      // recipients: recipients.split(',').map(email => { email })//confusing:func or shorten obj body?
      // recipients: recipients.split(',').map(email => ({ email })), //white space trim needed
      // recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      recipients: recipients.split(',').map(email => ({ email: email.trim(), responded: false })),
      _user: req.user.id, //current user id(id: mongoose auto generate)
      dateSent: Date.now()
    });

    try {
      //Great place to send an email!
      //ist arg: obj(subject, recipients) 2nd: html string(body of email)
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user); //update user model
    } catch (err) {
      res.status(422).send(err);//unprocessible entity
    }
  });
}

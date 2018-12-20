const sendgrid = require('sendgrid');
const helper = sendgrid.mail; //convention of sendGrid
// const { mail } = snedgrid //es6
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
//whenever making instance of Mailer, refrencing property from_email
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    //extracted email addr
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //helper.Mail builtin func
//Link injected into email contains a token to identify user
    this.addClickTracking();
    this.addRecipients();//register recipient with actual email
  }
//Extract  email addr from each obj of subdoc collection
  formatAddresses(recipients) {
  //Just pull off email property out of recipients obj
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {//extracted email addr
      personalize.addTo(recipient); //add it to personalize obj
    });
    this.addPersonalization(personalize); //func defined by Mail base class
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request); //func API provided by sgApi
    return response;
  }
}

//new Mailer(...)

module.exports = Mailer;

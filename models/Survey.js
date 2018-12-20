const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//Destructuring {} : mongoose obj has property named Schema
//take that perperty and assigned to new variable Schema
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //comma seperated list of email addresses -> array of string?
  //every single string represents single emali address
  // recipients: [String],
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  //which Survey belongs to which User(relationship between User, Survey)
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

//actual model class
mongoose.model('surveys', surveySchema);//name of class-> surveys
//this surveys goes to server.js

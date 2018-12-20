const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

//rather than registering schema to mongoose, module.export the schema
module.exports = recipientSchema;

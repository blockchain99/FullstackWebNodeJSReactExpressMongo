const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//Destructuring {} : mongoose obj has property named Schema
//take that perperty and assigned to new variable Schema
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

//actual model class
mongoose.model('users', userSchema);

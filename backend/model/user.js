const mongoose = require('mongoose');
const userValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  _id: { type: String },
  uID: { type: Number },
  last_name: { type: String },
  first_name: { type: String },
  coach: { type: Boolean },
  weight: { type: Number },
  height: { type: Number },
  account: { type: String },
  email: { type: String, required: true, unique: true },
  google_id: { type: String },
  facebook_id: { type: String },
  password: { type: String, required: true },
  date_birth: { type: Date },
  level: { type: Number },
  country: { type: Object },
  gym: { type: Array }
});

userSchema.plugin(userValidator);

module.exports = mongoose.model("User", userSchema);

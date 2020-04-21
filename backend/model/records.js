const mongoose = require('mongoose');

const recordsSchema = mongoose.Schema({
  session_id: { type: Number },
  date: { type: Date },
  exercise_id: { type: Number },
  user_id: { type: Number },
  series: { type: Array}
});


module.exports = mongoose.model("Record", recordsSchema);

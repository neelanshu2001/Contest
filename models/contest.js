const mongoose = require('mongoose');

const contestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  platform: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model('contest', contestSchema);

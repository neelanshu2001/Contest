const mongoose = require('mongoose');

const UserEventsSchema = mongoose.Schema({
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
  date: {
    type: String,
    required: true,
  },
  end: {
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

module.exports = mongoose.model('event', UserEventsSchema);

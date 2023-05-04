const mongoose = require('mongoose');

const User = require('./user');

const fileScheme = new mongoose.Schema({
  name: { type: String, require: true },
  size: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: User },
  path: { type: String }
});

module.exports = mongoose.model('file', fileScheme);
